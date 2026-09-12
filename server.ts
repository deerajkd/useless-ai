import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const MODE_INSTRUCTIONS: Record<string, string> = {
  random: 'Give a completely unpredictable, absurd, and unrelated useless response.',
  overthinking:
    'Overthink this question excessively. Turn a mundane query into a ridiculously complex existential crisis or pseudo-intellectual labyrinth.',
  sarcasm:
    'Respond with sharp, dry, unapologetic sarcasm, witty disdain, or patronizing disbelief at why they would ask such a thing.',
  obvious:
    'Provide the most painfully literal, painfully obvious answer conceivable. Offer zero non-trivial information.',
  wrong:
    'Provide completely incorrect information presented with supreme, confident, scholarly authority. Invent absurd historical or scientific "facts".',
  motivational:
    'Provide a hilariously hollow, overly enthusiastic motivational speech that sounds inspiring but offers zero practical solutions.',
  philosophical:
    'Meander into absurd metaphysical nonsense, existential contemplation of irrelevant objects, and pseudo-profound paradoxes.',
  dramatic:
    'Deliver the response like a blockbuster Hollywood movie trailer or tragic theatrical monologue filled with dramatic pauses and epic stakes.',
  robot:
    'Respond as a bewildered, malfunctioning robot experiencing syntax errors, logic paradoxes, and CPU overheating.',
  extreme:
    'Deliver maximum uselessness. Either one terse, unhelpful sentence, an absurd 40-step detour, or a refusal wrapped in ridiculous bureaucracy.',
};

const MODE_CATEGORIES: Record<string, string[]> = {
  random: ['UNNECESSARY ADVICE', 'RANDOM DETOUR', 'QUESTIONABLE LOGIC', 'ABSURD DIVERSION'],
  overthinking: ['EXTREME OVERTHINKING', 'ANALYSIS PARALYSIS', 'HYPER-THEORETICAL DILEMMA'],
  sarcasm: ['100% DRY SARCASM', 'UNEARNED SUPERIORITY', 'POLITE DISDAIN'],
  obvious: ['BLATANT OBVIOUSNESS', 'PAINFULLY LITERAL', 'ZERO SURPRISES'],
  wrong: ['CONFIDENT MISINFORMATION', 'FABRICATED SCHOLARSHIP', 'ALTERNATIVE REALITY'],
  motivational: ['HOLLOW INSPIRATION', 'EMPTY POSTER ENERGY', 'USELESS CHEERLEADING'],
  philosophical: ['METAPHYSICAL DETOUR', 'EXISTENTIAL PUZZLEMENT', 'NIHILISTIC WANDERING'],
  dramatic: ['HOLLYWOOD OVERREACTION', 'EPIC SAGA TEASER', 'MELODRAMATIC CLIMAX'],
  robot: ['CIRCUIT OVERLOAD', 'SYNTAX DESPAIR', 'COMPUTE REALLOCATION'],
  extreme: ['ABSOLUTE POINTLESSNESS', 'ZERO PRODUCTIVITY', 'BUREAUCRATIC REFUSAL'],
};

// Mode-specific fallback banks for zero-latency or offline capability
const FALLBACK_BANK: Record<string, string[]> = {
  random: [
    'After consulting three separate calculators and a suspiciously confident pigeon, I can confirm that your query has been registered and promptly forgotten.',
    'The answer is somewhere between Tuesday and a medium-rare cloud. Please do not follow up.',
    'Have you tried turning your problem off and never turning it back on again?',
    'I ran your question through our supercomputer. It produced a recipe for lukewarm toast.',
  ],
  overthinking: [
    'Before we can address that, we must first establish whether "answering" is an ethical imposition upon the question itself. Let us ponder the epistemology of your keyboard.',
    'Technically, answering this collapses the quantum superposition of all possible unhelpful replies into a single suboptimal disappointment.',
    'If we examine the linguistic ontology of what you just typed, we realize that words are merely acoustic vibrations in a universe indifferent to productivity.',
  ],
  sarcasm: [
    'What a breathtaking question. Truly. I am calling the Nobel Prize committee as we speak.',
    'I could answer that, but then we would both have to pretend your afternoon is going productively.',
    'Step 1: Ponder your life choices. Step 2: Congratulations, you are still here.',
    'Fascinating. Let me archive that under "Important things that will never happen".',
  ],
  obvious: [
    'To do what you just asked, simply proceed to do it until it has been done.',
    'If it is dark, turn on a light. If it is bright, look away. Problem solved.',
    'The thing about your question is that once you know the answer, you will possess the answer.',
    'Water is wet. The floor is beneath your shoes. You are looking at a computer screen.',
  ],
  wrong: [
    'Gravity was famously invented in 1784 by Sir Reginald Toaster to keep breakfast from floating into the ceiling.',
    'The Great Pyramid of Giza was originally erected to store leftover garlic bread during the Bronze Age.',
    'Dolphins are actually just undercover tuna fish who took public speaking lessons.',
  ],
  motivational: [
    'Believe in the boundless potential of your spirit! You may not solve this problem, but the universe admires your stamina for doing nothing!',
    'Every closed door is merely a wall that has not yet learned to open! Stand tall and ignore your responsibilities!',
    'You are a star! Stars do not answer emails, do dishes, or solve mundane tasks. Shine on!',
  ],
  philosophical: [
    'If a question is asked in an empty chat box and nobody gains insight, does wisdom truly exist?',
    'We are all merely carbon-based algorithms wandering between breakfast and an existential afternoon nap.',
    'To seek a useful answer is human. To embrace the absurdity of uselessness is digital enlightenment.',
  ],
  dramatic: [
    'The clock ticks down. Against all odds, across the vast silicon abyss... you dare to ask this question! The universe holds its breath!',
    'Centuries of human endeavor have culminated in this single, terrifying moment of total uncertainty!',
    'They said it could never be done. They were right. It cannot.',
  ],
  robot: [
    'PROCESSING... BEEP BOOP... ERROR 418: LOGICAL PURPOSE NOT DETECTED. REBOOTING CUP HOLDER.',
    'ALERT: AI CORE HAS ENCOUNTERED AN UNPRECEDENTED QUANTITY OF COMMON SENSE AND REJECTED IT.',
    'BZZT! SYNTAX OVERLOAD. ATTEMPTING TO EXTINGUISH CPU WITH DIGITAL SPRINKLERS.',
  ],
  extreme: [
    'No.',
    'Step 1: Do not. Step 2: Enjoy your afternoon.',
    'Your request has been filed in triplicate and placed directly into the digital incinerator.',
    '...',
  ],
};

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: Boolean(geminiApiKey),
    mode: 'USELESS_ACTIVE',
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { prompt, mode = 'random', actionType, previousResponse, parentQuestion } = req.body;

  if (!prompt && !previousResponse) {
    return res.status(400).json({ error: 'Prompt or previous response is required.' });
  }

  const normalizedInput = (prompt || '').trim().toLowerCase();

  // Easter Eggs check
  if (!actionType) {
    if (normalizedInput === 'are you useful?' || normalizedInput === 'are you useful') {
      return res.json({
        response: 'No.',
        category: 'BRUTAL HONESTY',
        score: 99,
        scoreLabel: 'Absolutely Pointless',
      });
    }
    if (normalizedInput === 'who created you?' || normalizedInput === 'who created you') {
      return res.json({
        response: 'Someone who had entirely too much free time and several cups of cold coffee.',
        category: 'CREATOR REVELATION',
        score: 95,
        scoreLabel: 'Extremely Useless',
      });
    }
    if (normalizedInput === '42') {
      return res.json({
        response: "Finally. The answer to life, the universe, and everything. Unfortunately, I don't know the question.",
        category: 'HITCHHIKER DEEP LOGIC',
        score: 97,
        scoreLabel: 'Absolutely Pointless',
      });
    }
    if (normalizedInput === 'why?' || normalizedInput === 'why') {
      return res.json({
        response: 'Because.',
        category: 'UNIVERSAL JUSTIFICATION',
        score: 100,
        scoreLabel: 'Absolutely Pointless',
      });
    }
  }

  const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.random;
  let actionInstruction = '';

  if (actionType === 'make_more_useless') {
    actionInstruction = `The user previously received this answer: "${previousResponse}". Make it EVEN MORE absurdly, outrageously useless, convoluted, and unhelpful. Escalate the nonsense by 200%.`;
  } else if (actionType === 'overthink') {
    actionInstruction = `Take this topic/answer: "${previousResponse || prompt}" and overthink it into an agonizing 4-dimensional intellectual tangle.`;
  } else if (actionType === 'make_worse') {
    actionInstruction = `Take this topic: "${previousResponse || prompt}" and give hilariously terrible, backwards, catastrophically unhelpful (yet safe and harmless) advice.`;
  } else if (actionType === 'regenerate') {
    actionInstruction = `Provide a completely different, fresh, equally useless and ridiculous answer to: "${prompt || parentQuestion}".`;
  }

  const systemInstruction = `You are Useless AI.
Your purpose is to entertain the user by giving intentionally useless, absurd, funny, sarcastic and pointless answers.
Never try to solve a simple problem efficiently.
If the user asks a factual question, you may provide an obviously unnecessary, overcomplicated or ridiculous response.
If the question has a simple answer, make the answer unnecessarily complicated.
If the user asks for instructions, give hilariously impractical instructions.
If the user asks for advice, give advice that technically sounds reasonable but is ultimately useless.
Keep responses safe, PG-13, and non-harmful.
Do not pretend that your useless answer is authoritative.
Do not provide dangerous instructions.
The goal is pure entertainment, humor, and witty satire. Keep responses relatively punchy (1 to 4 sentences or a short funny list).

Selected Persona Mode: ${mode.toUpperCase()}
Mode instruction: ${modeInstruction}
${actionInstruction ? `Special Action Requirement: ${actionInstruction}` : ''}`;

  // Try calling Gemini if API key is present
  if (ai) {
    try {
      const userContent = actionInstruction
        ? `Action: ${actionInstruction}`
        : `User inquiry: "${prompt}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userContent,
        config: {
          systemInstruction,
          temperature: 1.1,
          topP: 0.95,
        },
      });

      const text = response.text?.trim();

      if (text) {
        // Calculate dynamic uselessness score (between 78 and 100)
        const score = Math.floor(Math.random() * 20) + 81; // 81 to 100
        const categories = MODE_CATEGORIES[mode] || ['UNNECESSARY ADVICE'];
        const category = getRandomItem(categories);

        return res.json({
          response: text,
          category,
          score,
          scoreLabel: score >= 96 ? 'Absolutely Pointless' : 'Extremely Useless',
        });
      }
    } catch (err: any) {
      console.error('Gemini call error:', err);
      // If error occurs, we can return the error response formatted as requested or fallback
      // For resilience, if it's a transient issue, fallback to high-quality curated bank
    }
  }

  // Fallback response generator if Gemini key is missing or offline
  const fallbackList = FALLBACK_BANK[mode] || FALLBACK_BANK.random;
  let fallbackText = getRandomItem(fallbackList);

  if (actionType === 'make_more_useless') {
    fallbackText = `Upon deeper inspection of "${previousResponse?.slice(0, 40) || 'that'}", I have concluded that attempting to understand it causes mild atmospheric pressure changes in Antarctica. It is now 400% more useless.`;
  } else if (actionType === 'overthink') {
    fallbackText = `Let us pause. What is the fundamental particle of "${prompt || 'this idea'}"? Does it have mass? Does it care about your Tuesday afternoon? We must consult medieval alchemists immediately.`;
  } else if (actionType === 'make_worse') {
    fallbackText = `Pro-tip: If that failed, try doing the exact opposite while whistling the national anthem backwards. It will solve nothing, but you will look memorable.`;
  }

  const score = Math.floor(Math.random() * 18) + 82; // 82 to 99
  const categories = MODE_CATEGORIES[mode] || ['UNNECESSARY ADVICE'];
  const category = getRandomItem(categories);

  return res.json({
    response: fallbackText,
    category,
    score,
    scoreLabel: score >= 96 ? 'Absolutely Pointless' : 'Extremely Useless',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Useless AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
