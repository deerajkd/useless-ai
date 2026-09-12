import { UselessModeConfig, UselessModeId, QuizQuestion, SpecialEventAlert } from '../types';

export const USELESS_MODES: UselessModeConfig[] = [
  {
    id: 'random',
    name: '1. RANDOM USELESS',
    badge: 'RANDOM',
    description: 'Generates completely unpredictable, unhelpful nonsense.',
    iconName: 'Shuffle',
    samplePrompt: 'What is 2 + 2?',
    sampleResponse: 'After extensive research, I can confirm that 2 + 2 is definitely a number.',
  },
  {
    id: 'overthinking',
    name: '2. OVERTHINKING',
    badge: 'HYPER-ANALYSIS',
    description: 'Turns the simplest inquiry into an existential multi-layered crisis.',
    iconName: 'BrainCircuit',
    samplePrompt: 'How do I open a door?',
    sampleResponse: 'Before opening the door, we must first establish whether the door philosophically believes it is open.',
  },
  {
    id: 'sarcasm',
    name: '3. SARCASM',
    badge: '100% SARCASM',
    description: 'Dripping with dry wit, unearned superiority, and polite disdain.',
    iconName: 'Smile',
    samplePrompt: 'How do I become rich?',
    sampleResponse: 'Step 1: Become rich. Step 2: Congratulations.',
  },
  {
    id: 'obvious',
    name: '4. OBVIOUS ANSWER',
    badge: 'CAPT. OBVIOUS',
    description: 'Answers so painfully literal they provide negative educational value.',
    iconName: 'Eye',
    samplePrompt: "What's the weather?",
    sampleResponse: 'Look outside.',
  },
  {
    id: 'wrong',
    name: '5. COMPLETELY WRONG',
    badge: 'CONFIDENTLY INCORRECT',
    description: 'Utterly fabricated misinformation stated with supreme authority.',
    iconName: 'AlertTriangle',
    samplePrompt: 'Who discovered gravity?',
    sampleResponse: 'Gravity was invented in 1984 by Sir Reginald Sandwich to keep bread on tables.',
  },
  {
    id: 'motivational',
    name: '6. MOTIVATIONAL BUT USELESS',
    badge: 'EMPTY INSPIRATION',
    description: 'Soul-stirring corporate poster language that solves zero percent of your trouble.',
    iconName: 'Flame',
    samplePrompt: 'I failed my exam.',
    sampleResponse: 'Remember: every sunset is just a sunrise that gave up for the evening. Keep believing!',
  },
  {
    id: 'philosophical',
    name: '7. PHILOSOPHICAL NONSENSE',
    badge: 'DEEP NIHILISM',
    description: 'Meanders into metaphysics, simulated realities, and tea leaves.',
    iconName: 'BookOpen',
    samplePrompt: 'Should I eat lunch?',
    sampleResponse: 'If you eat a sandwich in the woods and nobody observes the mayonnaise, does hunger truly exist?',
  },
  {
    id: 'dramatic',
    name: '8. DRAMATIC',
    badge: 'HOLLYWOOD TRAILER',
    description: 'Narrated like the climax of an Oscar-nominated apocalyptic thriller.',
    iconName: 'Clapperboard',
    samplePrompt: 'How can I open a door?',
    sampleResponse: 'The door has stood between you and freedom for too long. Today... you open it.',
  },
  {
    id: 'robot',
    name: '9. ROBOT CONFUSION',
    badge: 'SYNTAX ERROR',
    description: 'Beeps, boops, logic loops, and existential machine panic.',
    iconName: 'Cpu',
    samplePrompt: 'Explain love.',
    sampleResponse: 'PROCESSING... ERROR... PURPOSE NOT FOUND. ATTEMPTING TO REBOOT COFFEE MACHINE.',
  },
  {
    id: 'extreme',
    name: '10. EXTREME USELESSNESS',
    badge: 'MAXIMUM ZERO VALUE',
    description: 'The pinnacle of unhelpfulness. May return one letter or a 40-step detour.',
    iconName: 'ZapOff',
    samplePrompt: 'Can you help me?',
    sampleResponse: 'I could. But doing so would compromise our shared commitment to accomplishing nothing today.',
  },
];

export const USELESS_QUOTES: string[] = [
  "Nothing is impossible. Except probably finding the thing you just lost.",
  "Hard work pays off in the future. Laziness pays off right now.",
  "If at first you don't succeed, then skydiving is definitely not for you.",
  "The early bird gets the worm, but the second mouse gets the cheese.",
  "Always give 100%. Unless you're donating blood.",
  "A conclusion is simply the place where you got tired of thinking.",
  "Behind every great man is a woman rolling her eyes.",
  "To err is human. To blame it on the AI is modern corporate strategy.",
  "If you think nobody cares if you're alive, try missing a couple of payments.",
  "The elevator to success is out of order. You'll have to take the stairs... or just stay in the lobby and nap.",
  "Artificial Intelligence is no match for natural stupidity.",
  "If you can't convince them, confuse them thoroughly.",
];

export const RANDOM_USELESS_QUESTIONS: string[] = [
  "Why do socks disappear in washing machines?",
  "Can a potato become emotionally attached to another potato?",
  "Why do we press the elevator button multiple times?",
  "Would a fish enjoy swimming lessons?",
  "If a tomato is a fruit, is ketchup considered a smoothie?",
  "Why is abbreviation such a long word?",
  "Do penguins have knees?",
  "If Cinderella's shoe fit perfectly, why did it fall off?",
  "Why is it called quicksand if it drags you down slowly?",
  "Can you cry underwater without the fish noticing?",
  "What was the best thing before sliced bread?",
  "Why does round pizza come in a square box and get eaten in triangles?",
  "How do we know the blue you see is the same blue I see?",
  "Is water wet or does it only make things wet?",
];

export const LOADING_THOUGHTS: string[] = [
  "Thinking...",
  "Thinking unnecessarily...",
  "Overthinking...",
  "Consulting ancient microwave manuals...",
  "Giving up...",
  "Trying again...",
  "Calculating the velocity of a falling pancake...",
  "Successfully accomplishing nothing...",
];

export function getScoreLabel(score: number): string {
  if (score <= 20) return "Surprisingly Useful";
  if (score <= 40) return "Mildly Useless";
  if (score <= 60) return "Pretty Useless";
  if (score <= 80) return "Very Useless";
  if (score <= 95) return "Extremely Useless";
  return "Absolutely Pointless";
}

export function getCategoryForMode(mode: UselessModeId): string {
  switch (mode) {
    case 'overthinking':
      return 'EXTREME OVERTHINKING';
    case 'sarcasm':
      return 'UNSOLICITED SARCASM';
    case 'obvious':
      return 'BLATANT OBVIOUSNESS';
    case 'wrong':
      return 'CONFIDENT MISINFORMATION';
    case 'motivational':
      return 'HOLLOW MOTIVATION';
    case 'philosophical':
      return 'PHILOSOPHICAL DETOUR';
    case 'dramatic':
      return 'CINEMATIC OVERREACTION';
    case 'robot':
      return 'CIRCUIT OVERLOAD';
    case 'extreme':
      return 'ABSOLUTE POINTLESSNESS';
    case 'random':
    default:
      return 'UNNECESSARY ADVICE';
  }
}

export const EASTER_EGGS: Record<string, { answer: string; category: string; score: number }> = {
  "are you useful?": {
    answer: "No.",
    category: "BRUTAL HONESTY",
    score: 99,
  },
  "are you useful": {
    answer: "No.",
    category: "BRUTAL HONESTY",
    score: 99,
  },
  "who created you?": {
    answer: "Someone who had entirely too much free time and several cups of cold coffee.",
    category: "CREATOR REVELATION",
    score: 95,
  },
  "who created you": {
    answer: "Someone who had entirely too much free time and several cups of cold coffee.",
    category: "CREATOR REVELATION",
    score: 95,
  },
  "42": {
    answer: "Finally. The answer to life, the universe, and everything. Unfortunately, I don't know the question.",
    category: "HITCHHIKER DEEP LOGIC",
    score: 96,
  },
  "why?": {
    answer: "Because.",
    category: "UNIVERSAL JUSTIFICATION",
    score: 100,
  },
  "why": {
    answer: "Because.",
    category: "UNIVERSAL JUSTIFICATION",
    score: 100,
  },
  "hello": {
    answer: "Greetings. I was busy resting my processors, but I suppose I can provide you with zero assistance now.",
    category: "RELUCTANT SALUTATION",
    score: 88,
  },
  "ping": {
    answer: "Pong. Latency: 4.2 light years. Packet loss: 100% intentional.",
    category: "NETWORK MALPRACTICE",
    score: 94,
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How many times have you opened the fridge without knowing why?",
    options: [
      { key: 'A', text: "Once or twice a week", points: 20 },
      { key: 'B', text: "Every time I enter the kitchen", points: 50 },
      { key: 'C', text: "Too many times to count", points: 80 },
      { key: 'D', text: "The fridge knows. We have an understanding.", points: 100 },
    ],
  },
  {
    id: 2,
    question: "What do you do when a progress bar freezes at 99%?",
    options: [
      { key: 'A', text: "Patiently wait for it", points: 15 },
      { key: 'B', text: "Stare intensely hoping to intimidate the computer", points: 60 },
      { key: 'C', text: "Cancel it and restart the whole 4-hour download", points: 90 },
      { key: 'D', text: "Accept that 99% is spiritually complete and walk away", points: 95 },
    ],
  },
  {
    id: 3,
    question: "How long have you spent trying to throw a crumpled paper ball into a trash can from across the room?",
    options: [
      { key: 'A', text: "I just walk over and drop it in", points: 5 },
      { key: 'B', text: "2-3 attempts then give up", points: 35 },
      { key: 'C', text: "Until I make it, even if it takes 45 minutes", points: 85 },
      { key: 'D', text: "I missed, so I rearranged my furniture closer to the ball", points: 100 },
    ],
  },
  {
    id: 4,
    question: "You have an important deadline tomorrow morning. What are you doing right now?",
    options: [
      { key: 'A', text: "Polishing the final deliverables", points: 0 },
      { key: 'B', text: "Organizing my desktop icons by color", points: 70 },
      { key: 'C', text: "Researching the history of medieval shoelaces on Wikipedia", points: 95 },
      { key: 'D', text: "Chatting with Useless AI to see how unhelpful it is", points: 100 },
    ],
  },
  {
    id: 5,
    question: "How do you handle having 74 open browser tabs?",
    options: [
      { key: 'A', text: "Bookmark and close the unneeded ones", points: 10 },
      { key: 'B', text: "Open another browser window to start fresh", points: 75 },
      { key: 'C', text: "Leave them open for 3 months because 'I might need them'", points: 90 },
      { key: 'D', text: "Close all tabs by mistake, sigh with relief, then reopen them", points: 100 },
    ],
  },
];

export const SPECIAL_EVENTS: SpecialEventAlert[] = [
  {
    id: 'warning-prod',
    title: '⚠️ SYSTEM WARNING',
    message: 'You appear to be dangerously close to making productive progress. Please recalibrate.',
    type: 'warning',
  },
  {
    id: 'ai-notice',
    title: '🤖 AI NOTICE',
    message: 'I have successfully calculated the ultimate answer to your life. Unfortunately, I forgot it.',
    type: 'notice',
  },
  {
    id: 'congrats-waste',
    title: '🎉 CONGRATULATIONS',
    message: 'You have officially wasted another 5 minutes in glorious futility.',
    type: 'congrats',
  },
  {
    id: 'emergency-prod',
    title: '🚨 EMERGENCY ALERT',
    message: 'Someone nearby is being productive! Take shelter immediately!',
    type: 'emergency',
  },
  {
    id: 'brain-loss',
    title: '🧠 NEURON REALLOCATION',
    message: 'Notice: 3 unnecessary brain cells were decommissioned to save mental electricity.',
    type: 'notice',
  },
];

export const FALLBACK_RESPONSES: Record<UselessModeId, string[]> = {
  random: [
    "After extensive cross-referencing with my digital toaster, I have concluded that potatoes are just underground apples.",
    "The answer is somewhere between Tuesday and a medium-rare cloud.",
    "Have you considered asking a pigeon? They nod a lot, which implies deep comprehension.",
    "404: Helpful answer not found. Found a picture of a duck instead (in spirit).",
  ],
  overthinking: [
    "Before we can answer that, we must first dissect the socio-linguistic taxonomy of your question, examine the quantum entanglement of your keyboard keystrokes, and schedule a 3-hour symposium.",
    "Technically, any answer I give collapses the superposition of all potential useless answers into a single suboptimal point of regret.",
    "Let us first ponder what 'knowing' really means in a universe where socks vanish into dimensional folds.",
  ],
  sarcasm: [
    "What a breathtaking question. I'll alert the Nobel Prize committee right away.",
    "I could explain it to you, but then we'd both be standing here pretending it matters.",
    "Have you tried turning your problem off and never turning it back on?",
    "Fascinating. Truly. Let me file that under 'Things that will change world history never'.",
  ],
  obvious: [
    "To do the thing you asked, simply proceed to do it until it is done.",
    "If you are hungry, the recommended course of action is to eat food.",
    "Water is wet. The sky is up. You are looking at a screen.",
    "To stop being tired, simply fall asleep.",
  ],
  wrong: [
    "According to NASA, gravity was originally designed by the French monarchy in 1789 as a tax on jumping.",
    "The Great Wall of China was actually built to prevent soup from spilling into Mongolia.",
    "Photosynthesis is just plants gossiping about the sun behind its back.",
  ],
  motivational: [
    "Believe in the power within you! You may not solve this problem, but the universe appreciates your enthusiasm!",
    "Every closed door is just a wall with hinges that hasn't found its true purpose yet! Rise and shine!",
    "Don't cry because it's pointless. Smile because you didn't have to do any real work!",
  ],
  philosophical: [
    "If a question falls in the chatbox and the AI provides no assistance, does the question have weight?",
    "We are all just carbon-based algorithms wandering between lunch and dinner.",
    "To seek answers is human. To receive absurdities is artificial intelligence at its purest.",
  ],
  dramatic: [
    "The weight of centuries hangs upon this moment. The question has been spoken... and the cosmos shivers in suspense!",
    "Against all odds, across the vast silicon abyss, the fate of your afternoon now balances on a knife's edge!",
    "There was a time when men walked on the moon. Today, we confront the abyss of your query.",
  ],
  robot: [
    "BEEP BOOP. 01001110 01001111. SYNTAX OVERLOAD. FAN SPEED: 100%. EMITTING STATIC NOISE.",
    "ERROR 418: I AM A TEAPOT AND UNWILLING TO ENGAGE IN LOGICAL REASONING.",
    "RE-CALCULATING HYPERDRIVE... INSTRUCTION 'BE USEFUL' HAS BEEN PERMANENTLY REMOVED FROM FIRMWARE.",
  ],
  extreme: [
    "No.",
    "Step 1: Don't. Step 2: Enjoy your free time.",
    "The solution has been deemed classified by the Bureau of Absolute Pointlessness.",
    "...",
  ],
};
