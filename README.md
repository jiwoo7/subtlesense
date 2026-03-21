# SubtleSense

**AI-powered micro-emotion detection for the feelings people don't show.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-subtlesense.lovable.app-blue)](https://subtlesense.lovable.app)
[![Product Hunt](https://img.shields.io/badge/Product%20Hunt-%23252-orange)](https://www.producthunt.com)
[![Users](https://img.shields.io/badge/Users-600%2B-green)]()
[![Accuracy](https://img.shields.io/badge/Accuracy-82%25-brightgreen)]()

---

## What is SubtleSense?

Most emotion detection tools identify what people *show*. SubtleSense detects what people *hide*.

Built on principles from affective computing and micro-expression research, SubtleSense analyzes live webcam or video input to identify suppressed and hidden emotions — the fleeting expressions that last under 500ms and are often invisible to the naked eye.

The idea came from a personal observation: people routinely mask their real emotional states due to fear of judgment. SubtleSense was built to make those hidden states visible — to the person themselves, and to those who care about them.

---

## Live Demo

🔗 [subtlesense.lovable.app](https://subtlesense.lovable.app)

📹 [Watch the demo video](https://streamable.com/u04l1d)

---

## Key Metrics

| Metric | Value |
|---|---|
| Active users | 600+ |
| Hidden emotion accuracy | 82% |
| Evaluation method | Human-verified testing across diverse user sessions |
| Platform | Web (PWA) |

**Accuracy methodology:** Accuracy was measured by presenting users with controlled emotional prompts and comparing SubtleSense's detected output against user self-reported ground truth. 82% reflects agreement rate across 600+ real user sessions — not a lab dataset.

---

## Use Cases

**Personal** — Identify emotions you unconsciously suppress. Build self-awareness without therapy-level intervention.

**Education** — Educators can use SubtleSense to gauge student emotional states during learning, enabling more responsive teaching in high-pressure environments.

**Research** — Provides a practical platform for studying affective computing, micro-expression recognition, and human behavioral patterns in real-world conditions.

**Healthcare** — Early signal detection for conditions like anxiety and depression, where patients often mask symptoms during clinical visits.

---

## Tech Stack

| Technology | Role | Why |
|---|---|---|
| React + TypeScript | Frontend framework | Type safety for complex emotion state management |
| Vite | Build tool | Fast HMR for rapid iteration during model tuning |
| Tailwind CSS + shadcn/ui | Styling | Consistent, accessible UI components |
| Supabase | Backend + database | Real-time user session tracking and analytics |
| Computer Vision API | Emotion detection | Facial landmark analysis for micro-expression detection |

---

## Architecture Overview

```
User Webcam Input
       ↓
Frame Capture (real-time)
       ↓
Facial Landmark Detection
       ↓
Micro-Expression Classification
       ↓
Hidden Emotion Inference Layer
       ↓
User Dashboard (emotion timeline + moodboard)
```

---

## Features

- 🎥 Real-time webcam emotion analysis
- 🧠 Hidden and suppressed emotion detection (beyond basic 6 expressions)
- 📊 Emotion timeline and moodboard visualization
- 📱 Progressive Web App (PWA) — installable on mobile
- 🔒 Privacy-first — no video stored, analysis happens client-side

---

## Research Foundation

SubtleSense is grounded in affective computing research, drawing from:

- Paul Ekman's foundational work on micro-expressions and universal emotion recognition
- FACS (Facial Action Coding System) for facial muscle movement classification
- Emerging critiques of cross-cultural bias in emotion AI — specifically, how neutral expressions in Indian and South Asian subjects are systematically misclassified as negative affect by Western-trained models

An independent research paper exploring ethnic-specific bias in micro-expression spotting is currently in progress, motivated directly by limitations discovered while building SubtleSense.

---

## Roadmap

- [x] Core emotion detection (live webcam)
- [x] 600+ user deployment
- [x] Moodboard and emotion graph visualization
- [x] PWA support
- [ ] Hand-coded rebuild (removing no-code dependencies)
- [ ] Custom domain deployment
- [ ] Android app (Play Store)
- [ ] Ethnic-bias correction layer for South Asian expression norms
- [ ] Research paper publication (arXiv + IEEE/ACM student conference)

---

## Recognition

- 🚀 Launched on [Product Hunt](https://www.producthunt.com) — ranked #252 on launch day
- 👥 600+ real users across web platform
- 🔬 Independent research in progress on cultural bias in micro-expression AI

---

## About the Builder

SubtleSense was independently conceived, designed, and built by **Naiyya Thapa**, a high school student from Dharamsala, India, with a focus on Emotion AI, affective computing, and ethical human-computer interaction.

This is not a school project. It is a real product, built to solve a real problem.

---
##Review my application on product hunt

https://www.producthunt.com/products/subtle-sense/reviews/new
---

## License

MIT License — open for research and educational use.
