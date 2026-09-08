export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  standfirst: string;
  readingTime: string;
  updated: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
}

export const guides: Guide[] = [
  {
    slug: "signs-you-are-suppressing-emotions",
    title: "How to know what emotion you're suppressing",
    metaTitle: "How to Know What Emotion You're Suppressing — 9 Quiet Signs",
    metaDescription:
      "Suppressed emotion rarely announces itself. Nine body-level and behavioural signs that something is being held back, and a short method for naming it.",
    eyebrow: "Volume II · On what is held back",
    standfirst:
      "Suppression is not silence. It is a feeling that keeps working underground — in the jaw, in the calendar, in the tone of a message you rewrote four times. Here is how to notice it before it costs you something.",
    readingTime: "7 minutes",
    updated: "2026-09-05",
    sections: [
      {
        heading: "Suppression is a skill, not a flaw",
        paragraphs: [
          "Most people who suppress emotion learned to do it for a good reason. A household where a raised voice was expensive. A job where composure was the currency. A friendship where being the steady one was the price of belonging. The habit worked, which is exactly why it persists long after the room that required it has emptied.",
          "The cost is not drama. It is accuracy. When a feeling is pushed below the line of awareness it does not stop influencing decisions — it simply stops being available for examination. You still act on it. You just cannot audit it.",
        ],
      },
      {
        heading: "Nine signs something is being held back",
        paragraphs: [
          "None of these is proof on its own. Two or three appearing together in the same week is worth a pause.",
        ],
        list: [
          "You answer 'fine' faster than the question was asked.",
          "Physical tension with no physical cause — jaw, shoulders, a shallow upper-chest breath.",
          "Disproportionate irritation at something small: a slow lift, a mis-loaded dishwasher.",
          "Sudden fatigue after ordinary social contact, as though you had performed rather than spoken.",
          "You rehearse conversations that already happened, editing your side.",
          "You cannot make a low-stakes decision — lunch, a film — while high-stakes ones feel easy.",
          "Numbness where you expected relief: good news lands flat.",
          "Compulsive filling of silence with scrolling, work, or noise.",
          "You describe your week entirely through other people's states and never your own.",
        ],
      },
      {
        heading: "A four-minute method for naming it",
        paragraphs: [
          "Naming is the whole intervention. Research on affect labelling consistently finds that putting a specific word to a feeling reduces its physiological charge — precision matters more than positivity.",
        ],
        list: [
          "Locate it in the body first. Where is the tightness? Do not interpret yet.",
          "Ask what happened in the twelve hours before it appeared, not the twelve minutes.",
          "Offer three candidate words, and reject the first — the first is usually the socially acceptable one.",
          "Finish the sentence: 'What I did not say was …' Write it, do not think it.",
          "Ask what the feeling wanted you to protect. Suppression almost always guards something.",
        ],
      },
      {
        heading: "When it is more than suppression",
        paragraphs: [
          "Persistent numbness, loss of interest in things that reliably mattered, sleep that has changed shape, or thoughts of harming yourself are not self-observation problems. They are clinical ones, and they deserve a licensed professional rather than an app. Subtle Sense is an instrument for noticing, not a diagnosis.",
        ],
      },
      {
        heading: "How Subtle Sense fits",
        paragraphs: [
          "A sixty-second reading returns three registers — Spoken, Felt and Unsaid — so the gap between what you presented and what your face and voice carried becomes visible instead of theoretical. Read the confidence figures lightly: they describe the strength of the signal observed, never the truth of your interior life.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between suppressing and repressing an emotion?",
        a: "Suppression is deliberate — you feel it and choose not to show it. Repression happens below awareness, so the feeling is unavailable to you as well as to others. The signs overlap; the second usually needs a longer, slower process to surface.",
      },
      {
        q: "Can suppressed emotion cause physical symptoms?",
        a: "Chronic emotional suppression is associated with sustained muscle tension, disturbed sleep and elevated stress load. It is not a diagnosis for any specific symptom — persistent physical complaints belong with a doctor.",
      },
      {
        q: "How long does it take to notice what you're holding back?",
        a: "Most people identify a pattern within one to two weeks of daily naming, because the pattern repeats faster than the feeling resolves.",
      },
    ],
  },
  {
    slug: "signs-of-masked-emotions",
    title: "Signs of masked emotions in yourself and others",
    metaTitle: "Signs of Masked Emotions — Reading the Face, Voice and Words",
    metaDescription:
      "Masked emotion leaks through timing, asymmetry and tone rather than expression. What actually signals a mask, what is folklore, and how to respond well.",
    eyebrow: "Volume III · On the composed face",
    standfirst:
      "A mask is a performance of an emotion that is not the one present. It is ordinary, often kind, and quietly exhausting. What follows is what genuinely signals one — and what is myth.",
    readingTime: "8 minutes",
    updated: "2026-09-05",
    sections: [
      {
        heading: "What a mask actually is",
        paragraphs: [
          "Masking is the substitution of a displayed emotion for a felt one. The smile in a performance review, the level voice on a call after bad news, the enthusiasm assembled for a party. It is not deceit. It is social maintenance, and most adults do it several times a day.",
          "It becomes worth attending to when it is involuntary — when you can no longer take the mask off in private, or when someone close to you appears to be wearing one continuously.",
        ],
      },
      {
        heading: "Signals that carry information",
        paragraphs: ["These are the cues that hold up reasonably well across research and practice."],
        list: [
          "Timing mismatch: the expression arrives a beat late, or lingers past the moment that justified it.",
          "Asymmetry: genuine spontaneous expression is more symmetrical than a deliberately produced one.",
          "The eyes do not participate — no orbicularis engagement around a smile.",
          "Prosody flattens: pitch range narrows while the words stay upbeat.",
          "Vocabulary abstracts. Specifics ('he cancelled again') become generalities ('things are busy').",
          "Consistent deflection back to the other person's experience.",
          "A visible reset — the face drops the moment attention moves elsewhere.",
        ],
      },
      {
        heading: "Signals that are folklore",
        paragraphs: [
          "Avoiding eye contact, fidgeting, crossed arms and touching the nose are unreliable. They vary enormously by culture, neurotype and simple temperature. Any reading — human or machine — that leans on them is guessing with confidence.",
        ],
      },
      {
        heading: "If you are the one masking",
        paragraphs: [
          "Do not aim to stop. Aim to notice which rooms require it and what it costs to leave them. A short daily reading, or two written lines about what you did not say, is enough to reveal whether the mask is a tool you use or a state you live in.",
        ],
      },
      {
        heading: "If someone you know is masking",
        paragraphs: [
          "Do not announce the observation. Naming someone's mask usually tightens it. Offer a low-pressure opening instead — a specific, undramatic question, a shared task, unrushed time — and let them choose the moment.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can AI detect masked emotions?",
        a: "Machine reading can flag composite signals — micro-expression asymmetry, prosodic flattening, hesitation — that often accompany masking. It cannot verify intent, and it should be treated as a prompt for reflection rather than a verdict.",
      },
      {
        q: "Is emotional masking always harmful?",
        a: "No. Situational masking is normal social behaviour. Sustained, involuntary masking is what correlates with exhaustion and burnout.",
      },
      {
        q: "How is autistic masking different?",
        a: "Autistic masking involves suppressing natural expression and behaviour to meet neurotypical expectations, across far more than emotion, and carries a much higher cumulative cost. Generic emotion-reading tools are trained largely on neurotypical baselines and can misread it.",
      },
    ],
  },
  {
    slug: "emotion-journaling-prompts",
    title: "40 emotion journaling prompts that go past 'how was your day'",
    metaTitle: "40 Emotion Journaling Prompts for Naming What You Actually Feel",
    metaDescription:
      "Forty specific journaling prompts grouped by state — anxious, numb, angry, grieving, hopeful — plus a short method that makes five minutes enough.",
    eyebrow: "Volume IV · On writing it down",
    standfirst:
      "Vague prompts produce vague entries. These are written to force a specific noun, because specificity is the part that does the work.",
    readingTime: "6 minutes",
    updated: "2026-09-05",
    sections: [
      {
        heading: "The five-minute method",
        paragraphs: [
          "Set a timer. Write by hand if you can. Do not edit, do not aim for insight, and stop when the timer stops — an unfinished entry brings you back tomorrow. One prompt per sitting is enough.",
        ],
      },
      {
        heading: "When you feel anxious",
        paragraphs: [],
        list: [
          "What exactly am I predicting will happen, in one sentence?",
          "What would I tell a friend who described this to me?",
          "Which part of this is mine to carry, and which part am I borrowing?",
          "What is the smallest true thing I know right now?",
          "If this resolves badly, what would I still have?",
          "What did my body do before my mind explained it?",
          "What am I checking repeatedly, and what am I hoping it will say?",
          "What would 'enough' look like today?",
        ],
      },
      {
        heading: "When you feel numb",
        paragraphs: [],
        list: [
          "When did I last feel anything strongly, and what was it?",
          "What am I avoiding feeling by feeling nothing?",
          "Describe today in physical detail only — no interpretation.",
          "What used to move me that does not now?",
          "If the numbness could speak, what would it be protecting me from?",
          "What is one small thing I could do badly today?",
          "Who have I not answered, and why?",
          "What would I notice first if this lifted?",
        ],
      },
      {
        heading: "When you feel angry",
        paragraphs: [],
        list: [
          "What line was crossed, precisely?",
          "What did I want the other person to say instead?",
          "Is this anger about now, or about a pattern?",
          "What am I afraid this means about how I am seen?",
          "What would I say if there were no consequence?",
          "What is the hurt underneath the heat?",
          "What do I actually want to change?",
          "What will I regret saying tomorrow?",
        ],
      },
      {
        heading: "When you are grieving",
        paragraphs: [],
        list: [
          "What do I miss that nobody else would think to name?",
          "What have I not been allowed to say about this?",
          "What does an ordinary Tuesday look like without them?",
          "What am I still doing out of habit for someone who is gone?",
          "What would I want them to know about this week?",
          "Where does the grief sit in my body today?",
          "What have other people got wrong about how I am coping?",
          "What would gentleness mean today, concretely?",
        ],
      },
      {
        heading: "When something is going well",
        paragraphs: [],
        list: [
          "What went right, and what part of it was mine?",
          "What am I bracing for, and why does good news require bracing?",
          "Who helped, and have I told them?",
          "What do I want more of, in specific terms?",
          "What did I stop doing that made room for this?",
          "What would I like to remember about today in a year?",
          "What am I quietly proud of and reluctant to say aloud?",
          "What does rest look like now that I have earned it?",
        ],
      },
      {
        heading: "Pairing writing with a reading",
        paragraphs: [
          "Writing catches what you know. A short capture catches what you presented. Doing both in one sitting — the entry first, the reading second — makes the distance between the two legible, which is usually where the useful information sits.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I journal about emotions?",
        a: "Short and frequent beats long and rare. Five minutes on most days produces a pattern you can read back; an hour once a month produces a document.",
      },
      {
        q: "What if writing makes me feel worse?",
        a: "Stop, and switch to description rather than analysis — what you can see, hear and touch. If distress is persistent, take it to a professional rather than the page.",
      },
      {
        q: "Should journal entries be private?",
        a: "Yes, by default. Entries written for an audience get edited before they get honest.",
      },
    ],
  },
  {
    slug: "how-to-name-your-feelings",
    title: "How to name your feelings when 'fine' is the only word available",
    metaTitle: "How to Name Your Feelings — A Practical Emotional Vocabulary",
    metaDescription:
      "A working method and a graded vocabulary for naming emotion precisely, from broad states to specific words, plus why affect labelling lowers the charge.",
    eyebrow: "Volume V · On finding the word",
    standfirst:
      "Emotional granularity — the ability to distinguish 'disappointed' from 'resentful' from 'ashamed' — predicts how well people regulate. It is a vocabulary problem before it is a feelings problem.",
    readingTime: "6 minutes",
    updated: "2026-09-05",
    sections: [
      {
        heading: "Why the exact word matters",
        paragraphs: [
          "Broad labels prescribe broad responses. 'Stressed' suggests rest; but if the accurate word is 'resentful', rest changes nothing and a conversation changes everything. Precision is not literary. It is what tells you which action would actually help.",
        ],
      },
      {
        heading: "Start with two dials, then narrow",
        paragraphs: [
          "Before reaching for a word, place the state on two axes: pleasant to unpleasant, and high to low energy. That gives you a quadrant. Then narrow within it.",
        ],
        list: [
          "Unpleasant, high energy: anxious, furious, panicked, indignant, jittery, exposed.",
          "Unpleasant, low energy: flat, disheartened, lonely, ashamed, resigned, hollow.",
          "Pleasant, high energy: elated, eager, emboldened, playful, moved, alight.",
          "Pleasant, low energy: settled, tender, relieved, content, grateful, safe.",
        ],
      },
      {
        heading: "Three questions that find the word",
        paragraphs: [],
        list: [
          "What do I want to do right now — approach, withdraw, confront, hide? The impulse names the family.",
          "Who is in the picture? Emotions with another person in them are usually relational: hurt, envy, resentment, longing.",
          "What was expected but did not happen? Violated expectation points to disappointment, betrayal or grief.",
        ],
      },
      {
        heading: "Words worth adding to your vocabulary",
        paragraphs: [
          "Most people run on about a dozen emotion words. Adding fifteen changes what you can notice.",
        ],
        list: [
          "Chagrin — embarrassment mixed with annoyance at yourself.",
          "Ambivalence — two true feelings at once, neither cancelling the other.",
          "Weariness — tiredness that sleep does not fix.",
          "Yearning — wanting without expectation of getting.",
          "Indignation — anger with a moral claim attached.",
          "Exposure — the feeling of having shown too much.",
          "Consolation — comfort that does not remove the loss.",
        ],
      },
      {
        heading: "Practising without a mirror",
        paragraphs: [
          "Name one emotion out loud each day, unprompted, with a reason attached: 'I am uneasy, because the meeting was moved without explanation.' Fourteen days of that is usually enough to make the harder ones reachable.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is emotional granularity?",
        a: "The capacity to distinguish between closely related emotional states with precise language. Higher granularity is associated with better regulation and less reliance on avoidance.",
      },
      {
        q: "Does naming an emotion really reduce it?",
        a: "Affect labelling research finds that putting a specific word to a feeling reduces its physiological intensity. It does not resolve the cause, but it makes the state workable.",
      },
      {
        q: "Can a tool name my feelings for me?",
        a: "It can offer candidates from what it observed and let you accept or reject them. The final word should always be yours — you have context no capture contains.",
      },
    ],
  },
  {
    slug: "emotional-burnout-signs",
    title: "Emotional burnout: the signs that arrive before exhaustion",
    metaTitle: "Emotional Burnout Signs — What Comes Before Exhaustion",
    metaDescription:
      "Burnout announces itself long before collapse. The early emotional signals, the three stages, and what genuinely helps at each one.",
    eyebrow: "Volume VI · On running empty",
    standfirst:
      "Burnout is rarely a sudden failure. It is a slow narrowing — of patience, of curiosity, of the range of things that can still move you. The early signals are emotional, not physical.",
    readingTime: "8 minutes",
    updated: "2026-09-08",
    sections: [
      {
        heading: "Burnout is a depletion of response, not of energy",
        paragraphs: [
          "People expect burnout to feel like tiredness. More often it feels like flatness: the work still gets done, the messages still get answered, but nothing lands. The clinical description names three components — exhaustion, cynical distance, and a collapsed sense of effectiveness — and only the first is about energy.",
          "This is why rest alone frequently fails. A week away restores energy and returns you to the same conditions that produced the distance. The distance is the signal worth reading.",
        ],
      },
      {
        heading: "Early signals, in the order they usually appear",
        paragraphs: ["These tend to arrive months before anyone calls it burnout."],
        list: [
          "Small requests feel disproportionately heavy — a two-minute reply is postponed for days.",
          "You stop having opinions about work you used to argue about.",
          "Sunday evening acquires a physical sensation.",
          "You describe colleagues in categories rather than as people.",
          "Recovery time lengthens: a hard day now costs two.",
          "Pleasures outside work also thin out — the flatness stops respecting the boundary.",
          "You fantasise about a rupture rather than a change: quitting, disappearing, being ill enough to be excused.",
        ],
      },
      {
        heading: "The three stages, and what helps at each",
        paragraphs: [],
        list: [
          "Strain — still recoverable by rest and boundaries. Protect one uninterrupted block a day and refuse one thing a week.",
          "Distance — rest no longer restores. This stage needs a change in conditions: load, autonomy, or who you answer to.",
          "Depletion — effectiveness collapses and self-criticism becomes constant. This stage needs external support; it is not a willpower problem.",
        ],
      },
      {
        heading: "Why masking accelerates it",
        paragraphs: [
          "Sustained performance of an emotion you do not feel carries a measurable cost, sometimes called surface acting. The gap between displayed and felt state is the expensive part — not the difficulty of the work. People in roles that require constant composure burn out on lighter workloads than people permitted to be visibly frustrated.",
          "If you cannot change what you display, changing where you can stop displaying it matters more than usual: one relationship, one hour, one page.",
        ],
      },
      {
        heading: "A weekly two-minute audit",
        paragraphs: [],
        list: [
          "What did I feel this week that I did not show?",
          "What did I stop caring about that I used to defend?",
          "How long did it take me to recover from the worst hour?",
          "What would need to change for next week to cost less?",
        ],
      },
      {
        heading: "Where a reading helps",
        paragraphs: [
          "A sixty-second capture gives you the distance between what you presented and what your face and voice carried. Tracked across a few weeks, that gap widening is a more honest early indicator than asking yourself whether you are coping — a question most people answer with a habit rather than an observation.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between burnout and depression?",
        a: "Burnout is tied to a context — usually work — and tends to lift when that context genuinely changes. Depression is pervasive across contexts and includes symptoms burnout does not, such as persistent worthlessness. They overlap and can co-occur; a professional should make the distinction.",
      },
      {
        q: "Can you recover from burnout without quitting?",
        a: "Often, yes — but only if the conditions change, not just the hours. Autonomy, clarity of expectation, and a reduction in required emotional performance matter more than the size of the workload.",
      },
      {
        q: "How long does burnout recovery take?",
        a: "Early strain resolves in weeks. Depletion stage recovery is commonly measured in months, and rushing it is the most reliable way to repeat it.",
      },
    ],
  },
  {
    slug: "high-functioning-anxiety",
    title: "High-functioning anxiety: when nothing looks wrong",
    metaTitle: "High-Functioning Anxiety — Signs, Costs and What Helps",
    metaDescription:
      "High-functioning anxiety hides behind competence and punctuality. The signs others never see, why achievement reinforces it, and practical ways through.",
    eyebrow: "Volume VII · On the composed achiever",
    standfirst:
      "It is the anxiety nobody intervenes in, because it produces good outcomes. Early to everything, prepared for everything, and quietly running at a cost no one is billed for.",
    readingTime: "7 minutes",
    updated: "2026-09-08",
    sections: [
      {
        heading: "Why it goes unnoticed",
        paragraphs: [
          "High-functioning anxiety is not a diagnostic category. It is a description of a pattern: significant internal anxiety paired with outward performance that meets or exceeds expectation. Because the visible output is good, the internal cost never triggers concern — from others, and often from the person themselves.",
          "The reinforcement loop is the problem. Anxiety drives over-preparation, over-preparation produces praise, and praise confirms that the anxiety was necessary.",
        ],
      },
      {
        heading: "What it actually looks like from inside",
        paragraphs: [],
        list: [
          "Arriving early everywhere, because lateness carries an outsized dread.",
          "Rehearsing ordinary conversations in advance and reviewing them afterwards.",
          "Difficulty accepting a compliment without immediately naming what could have been better.",
          "Productivity as a regulation strategy: doing something because stopping is unbearable.",
          "A body that never fully settles — a low hum of alertness even during rest.",
          "Saying yes quickly, then resenting the commitment quietly.",
          "Catastrophic forecasting that you would never say aloud because it sounds absurd.",
        ],
      },
      {
        heading: "The costs that eventually surface",
        paragraphs: [
          "Sleep is usually the first to go, then digestion, then patience with the people who get the unperformed version of you. Relationships absorb what the workplace never sees. The pattern is stable until an ordinary setback lands on an already-full system and the response looks disproportionate to everyone watching.",
        ],
      },
      {
        heading: "What actually reduces it",
        paragraphs: ["Reassurance does not work, because the mechanism is not a lack of information."],
        list: [
          "Deliberately do one low-stakes thing to a lower standard, and watch the consequence be nothing.",
          "Name the prediction in one sentence before acting on it — precision deflates most forecasts.",
          "Delay the reflexive yes by a fixed interval: 'Let me confirm this evening.'",
          "Separate rest from earning it. Schedule it before the work, not after.",
          "Treat physical settling as primary: long exhale, feet on floor, unhurried breath before speaking.",
        ],
      },
      {
        heading: "When to get help",
        paragraphs: [
          "If the anxiety is present most days for six months, if sleep is regularly disturbed, or if the only relief comes from working, that is worth a conversation with a professional. Functioning well is not the same as being well, and treatment works.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is high-functioning anxiety a real diagnosis?",
        a: "No. It is not in diagnostic manuals. Clinically it usually maps onto generalised anxiety disorder, and the absence of a label often delays people from seeking help that would work.",
      },
      {
        q: "Can anxiety make you more successful?",
        a: "In the short term it can drive preparation and vigilance. Over time it narrows risk-taking, damages sleep and health, and the achievement usually persists after the anxiety is treated — it was not the engine people assume.",
      },
      {
        q: "How do I explain it to someone who thinks I'm fine?",
        a: "Describe the mechanics, not the feeling: how early you arrive, how long you rehearse, how long recovery takes. Behaviour is easier to hear than distress.",
      },
    ],
  },
  {
    slug: "reading-emotion-in-voice",
    title: "What your voice reveals that your face does not",
    metaTitle: "Reading Emotion in Voice — Prosody, Pace and What It Reveals",
    metaDescription:
      "The voice leaks emotion the face can hold back. How pitch, pace, pauses and breath carry state, what the science supports, and where it misleads.",
    eyebrow: "Volume VIII · On the sound of a state",
    standfirst:
      "A face can be arranged. A voice is harder — it is built from breath, and breath answers to the nervous system before it answers to intention.",
    readingTime: "7 minutes",
    updated: "2026-09-08",
    sections: [
      {
        heading: "Why voice is harder to govern",
        paragraphs: [
          "Facial expression uses muscles you can consciously recruit. Vocal quality depends on breath support, laryngeal tension and timing, most of which shift automatically with arousal. People successfully hold a neutral face for a full sentence far more often than they hold a neutral voice.",
          "This is why a phone call sometimes tells someone more than a visit did.",
        ],
      },
      {
        heading: "The features that carry information",
        paragraphs: ["These are the prosodic markers with reasonable support in research."],
        list: [
          "Pitch range — narrowing suggests withdrawal or suppression; widening suggests arousal, pleasant or not.",
          "Speech rate — sudden acceleration often accompanies anxiety; a marked slowdown often accompanies low mood or grief.",
          "Pause structure — hesitation before emotionally loaded words, or long gaps where fluency was previously easy.",
          "Breath — audible upper-chest breathing, or sentences that run out of air before their end.",
          "Volume floor — the quietest points of speech dropping away, as though the sentence loses conviction.",
          "Voice quality — creak at the end of phrases, a tightness in the throat, or an unusual breathiness.",
        ],
      },
      {
        heading: "Where voice reading misleads",
        paragraphs: [
          "Accent, first language, head cold, caffeine, phone codec, room noise and simple personality account for enormous variation. A slow, flat speaker is not necessarily depressed; a fast one is not necessarily anxious. Anything useful comes from deviation against that person's own baseline, not against a population average.",
          "Any system — human or automated — that reads a single clip against a general model is making a confident guess. That is the honest description.",
        ],
      },
      {
        heading: "Listening better in ordinary conversation",
        paragraphs: [],
        list: [
          "Track change, not state: what is different from how this person usually sounds?",
          "Notice where fluency breaks, and what word it broke before.",
          "Leave the pause open for three seconds longer than is comfortable.",
          "Reflect the observation without interpretation: 'You went quiet there.'",
          "Never announce a conclusion about someone's interior from their voice — ask instead.",
        ],
      },
      {
        heading: "How Subtle Sense uses voice",
        paragraphs: [
          "A capture with audio contributes prosodic signal alongside facial cues, and the two are weighed together into the Spoken, Felt and Unsaid registers. Where they disagree, that disagreement is the point — it is usually the most informative part of the reading. Confidence figures describe signal strength, not certainty about you.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can emotion be detected from voice alone?",
        a: "Partially. Systems perform meaningfully above chance on broad categories like arousal, and poorly on fine distinctions such as separating anxiety from excitement. Combining voice with facial and linguistic signal is more reliable than any one channel.",
      },
      {
        q: "Does a monotone voice mean someone is depressed?",
        a: "No. Reduced pitch range is associated with low mood, but it is also a stable trait for many people and varies by language and culture. It is only informative as a change from that person's own norm.",
      },
      {
        q: "Is voice emotion analysis accurate?",
        a: "It is a probabilistic reading, not a measurement. Treat outputs as prompts for reflection, and be sceptical of any tool that reports a feeling as a fact.",
      },
    ],
  },
  {
    slug: "how-to-support-someone-who-wont-talk",
    title: "How to support someone who will not talk about it",
    metaTitle: "How to Support Someone Who Won't Open Up — A Practical Guide",
    metaDescription:
      "What to say and what to avoid when someone close to you is clearly struggling and will not talk. Openings, timing, and how to stay useful over months.",
    eyebrow: "Volume IX · On staying close",
    standfirst:
      "The instinct is to ask better questions. Usually the thing that works is lowering the price of answering — and being reliably there when the moment arrives unannounced.",
    readingTime: "7 minutes",
    updated: "2026-09-08",
    sections: [
      {
        heading: "Silence is usually protection, not rejection",
        paragraphs: [
          "People withhold for reasons that make sense to them: not wanting to be a burden, not having language for it yet, having been met badly before, or fearing that saying it aloud will make it real. Almost none of those reasons are about you, and pressing harder confirms the cost of speaking.",
        ],
      },
      {
        heading: "Openings that lower the price",
        paragraphs: [],
        list: [
          "Be specific rather than general: 'You've seemed flat since the move' beats 'Are you okay?'",
          "Offer a shared activity instead of a conversation — driving, walking, cooking. Side-by-side is easier than face-to-face.",
          "Give permission to decline: 'You don't have to answer. I just wanted you to know I noticed.'",
          "Name your own state first, briefly and without performance.",
          "Send a message that requires nothing: 'Thinking of you. No reply needed.'",
          "Return more than once. A single check-in reads as politeness; the third reads as real.",
        ],
      },
      {
        heading: "What reliably closes the door",
        paragraphs: [],
        list: [
          "Diagnosing them — 'you're clearly depressed' — however accurate.",
          "Comparing: 'when I went through this…' before they have said anything.",
          "Solving immediately. Advice arriving before understanding tells them you want the topic finished.",
          "Reporting the conversation to others, however caringly.",
          "Making their silence about your hurt feelings.",
        ],
      },
      {
        heading: "When they do talk",
        paragraphs: [
          "Say less than feels natural. Reflect the specific words they used rather than paraphrasing them upward into something more manageable. Ask 'what would help?' and accept 'nothing' as an answer. Then follow up in a few days, referencing what they told you — being remembered is the part that makes people speak again.",
        ],
      },
      {
        heading: "Where the line is",
        paragraphs: [
          "If there is any indication of self-harm or suicide, ask directly and plainly — asking does not plant the idea — and involve professional or emergency help. Support from a friend is not a substitute for care, and staying close does not mean carrying it alone.",
        ],
      },
    ],
    faqs: [
      {
        q: "What do I say to someone who says they're fine but clearly isn't?",
        a: "Accept the answer aloud and leave the door open: 'Okay. I'm around if that changes.' Then come back another day with something specific you noticed. Pressure produces a firmer 'fine'.",
      },
      {
        q: "How often should I check in without being annoying?",
        a: "Low-demand contact roughly weekly is rarely felt as pressure if it asks nothing in return. What irritates people is being interrogated, not being remembered.",
      },
      {
        q: "Should I tell someone else I'm worried about them?",
        a: "Only if there is risk of harm, or with their agreement. Otherwise it usually reaches them as a betrayal and costs you the access you had.",
      },
    ],
  },
];


export const getGuide = (slug?: string) => guides.find((g) => g.slug === slug);
