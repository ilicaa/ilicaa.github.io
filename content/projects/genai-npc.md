---
title: Generative AI NPC Framework
pitch: An RPG where LLM-powered NPCs remember what you told them, talk to each other, and stay in character.
status: Shipped
tracks: [production, technical-qa]
tags: [Senior project, LLM, RAG, Unity, FastAPI]
order: 1

# Quick facts — shown exactly as written. List only what you personally did.
role: Team lead, Backend Engineer (Unity & LLM Integration)
contributions:
  - Pitched the concept and led the team.
  - Tracked milestones, did reportings across weekly sprints. Presented progressions monthly to supervisor.
  - Bridged the game and AI sides of the project by integrating the Unity client with the Python FastAPI backend.
  - Built the GameMaster module, which generates location-based backgrounds and multi-stage quests from world lore.
credits:
  - { who: "Dr. Arda Sezen", what: Supervisor }
  - { who: "Çınar Çermen", what: "Database Systems" }
  - { who: "Safa Salih Tabak", what: "Unity Development" }
  - { who: "Yasmin Çetin", what: "LLM & RAG Systems" }
teamSize: 4
duration: "Oct 2025 – Jan 2026"
tools: [Unity (C#), Python, FastAPI, Qdrant, Hugging Face (Qwen2.5-72B-Instruct)]

# Images live in content/media/genai-npc/ and are referenced relative to this file:
# thumbnail: { src: ../media/genai-npc/thumb.png, alt: "Describe the image" }
# hero:
#   image: { src: ../media/genai-npc/hero.png, alt: "Describe the image" }
#   # or: video: { provider: youtube, id: "VIDEO_ID", title: "Gameplay trailer" }

# milestones:
#   - { name: "Proposal approved", date: "Oct 2025", done: true }
# tracking: "How work was tracked (tool, cadence, rituals)"
# risks:
#   - { risk: "What could go wrong", mitigation: "What you did about it" }
# metrics:          # only real numbers; renders the Results highlight
#   - { value: "12", label: "milestones delivered", note: "optional context" }
gallery:            # section: overview | role | process | decisions | results | retrospective | media
  - src: ../media/genai-npc/gameplay-dialogue-1.png
    alt: "The player character stands near a knight NPC and a goblin on a grass field by a stone bridge, with a dialogue box showing the player's Turkish greeting to Captain Gixx Shortpebble"
    caption: "The player greets an NPC in the Unity client."
    section: media
  - src: ../media/genai-npc/gameplay-dialogue-2.png
    alt: "The same scene with the knight NPC's long Turkish reply in the dialogue box, written in character about the peace treaty and safer seas"
    caption: "The LLM-generated reply, written in the NPC's persona and using world lore."
    section: media
  - src: ../media/genai-npc/system-architecture.png
    alt: "System architecture diagram showing the Unity client calling a FastAPI server over HTTP REST, which connects the NPC dialogue, context retrieval, session management, data processing and Qdrant vector database layers to the Hugging Face LLM and sentence transformer"
    caption: "System architecture: Unity client, FastAPI gateway, dialogue engines, Qdrant memory and external model services."
    section: decisions
  - src: ../media/genai-npc/genai-trello-production.png
    alt: "Trello board for the GenAI for Games course with Backlog, Research, To Do, Doing, Review / Testing and Done columns"
    caption: "Our Trello board, which we used to track work across sprints."
    section: process
  - src: ../media/genai-npc/genai-trello-production-2.png
    alt: "Trello card titled LLM Decision, noting the Llama 3.1 8B model was not performing well enough, with a checklist and comments listing alternative models"
    caption: "The LLM Decision card, where we tracked the search for a better model."
    section: process
# videos:
#   - { provider: youtube, id: "VIDEO_ID", title: "Demo walkthrough" }
# documents:
#   - { file: ../media/genai-npc/one-pager.pdf, label: "One-pager (PDF)" }
thumbnail: { src: ../media/genai-npc/gameplay-dialogue-1.png, alt: "GenAI" }

links:
  repoPrivate: true
---

## Overview and goals

Traditional RPGs lean on branching dialogue trees, so NPCs repeat themselves, forget what the player said, and never talk to each other. This senior project asked whether an LLM could change that in a playable 2D top-down RPG.

We built a “brain and body” system. A Unity client handles movement, UI and triggers. A Python FastAPI backend pairs an LLM with a Qdrant vector database, so NPCs keep memories across sessions, hold distinct personas, and talk to each other while the player can step into the conversation. A GameMaster module on top generates location-based backgrounds and multi-stage quests from the world lore.

The framework is aimed at players who want less repetitive RPGs, and at developers and researchers exploring generative AI in games.

## My role and contributions

I pitched the concept and led our four-person team from idea to final delivery.

- **Production:** handled most of the team’s progress tracking and reporting across the sprints and the reviews with our supervisor.
- **Integration:** connected the Unity client to the FastAPI backend (about 20 REST endpoints) through a C# API layer.
- **Risk reduction:** added fallback handling for malformed LLM output, and evaluated alternative models (Llama 3/3.1 8B, GPT-OSS-20B) before we committed to the final setup.
- **GameMaster:** built the module that generates location-based backgrounds and multi-stage quests from world lore, plus the test suite covering end-to-end quest generation, NPC memory recall and error handling.

**What teammates did:** Yasmin owned the LLM implementation and RAG research. Çınar built the database and researched the vector DB. Safa set up the Unity environment and worked with me on the database and model backend.

## Process and planning

We ran the project as Scrum over an 18-week timeline (18 September 2025 to presentation day): 7 sprints, 11 backlog tasks and 55 story points. Every task had a priority, an effort estimate out of 10, and an owner.

- **Sprint 1 (18 Sep – 16 Oct):** literature review, technology choices, first LLM, database and backend structure. 100% complete.
- **Sprint 2 (16 Oct – 6 Nov):** defined the problem and listed trade-offs. 100% complete.
- **Sprint 3 (6 – 13 Nov):** first system tests and a documented list of deficiencies.
- **Sprint 4 (13 – 27 Nov):** researched and compared alternative solutions.
- **Sprint 5 (27 Nov – 11 Dec):** integrated all subsystems. It reached about 80% and ran past its estimate.
- **Sprints 6–7 (11 Dec – presentation day):** simulation and validation prep, final checks, presentation.

**Risks we planned around:** hosted-inference latency (1.5–3 s per request), no local GPU, weaker Turkish output from Llama 3.1, and token limits as persona, memory and lore pushed prompts longer. Each was handled with async requests, a visible “Thinking…” indicator, model comparison, and trimmed prompts.

## Key design decisions

1. **Split brain and body.** Unity runs C#, but the RAG and LLM stack is Python, so FastAPI sits between them as a thin gateway that routes to separate player–NPC and NPC–NPC engines. Cost: a network hop, but it averaged 150 ms of a 3.2 s response, so the LLM (2.8 s) was the real bottleneck.
2. **Memory through RAG, not long prompts.** Every conversation and lore event is embedded and stored in Qdrant, and only relevant memories are retrieved per turn. This keeps prompts under the token limit. Retrieval stayed under 500 ms, and vector search took 45 ms at 100 points and 145 ms at 10,000.
3. **Pick the model by measurement.** We scored 50 Turkish NPC–NPC dialogues per experiment on persona, lore and context similarity. Qwen2.5-32B-Instruct beat Gemma-3-27B (final score 0.315 and 0.338 against 0.291 and 0.286 across two experiments).
4. **Static first chapter, generated chapters after.** A fixed opening grounds the lore, and LLM-generated chapters adapt to the player afterwards. This balances structure against chaos so the world doesn’t drift.

## Results

- **Response time:** 3.2 s average end to end (LLM 2.8 s, database 120 ms, network 150 ms).
- **Memory recall:** 2.4 / 3.0 average score and 85% keyword coverage across five recall scenarios.
- **Load:** 0% errors up to 5 concurrent users, 2% at 10, 8% at 20. Average response time rose from 3.2 s to 6.1 s.
- **Model comparison:** Qwen2.5-32B-Instruct outperformed Gemma-3-27B on persona consistency and overall dialogue coherence.
- **Testing:** pytest API tests for player–NPC flows, NPC–NPC flows and error handling (404 and 422 responses, no server crashes), plus a 1,549-line memory test suite.

All results come from internal testing. We did not run a player study.

## What went wrong / what I'd change

- **The GameMaster never reached the demo.** It worked in my test cases, but timing problems kept it out of the demo, so the audience didn’t see the part I built most directly. It is in the code. Next time I’d lock the demo scope earlier and record a backup video of every feature.
- **Integration came too late.** Sprint 5 only reached about 80% because we started wiring Unity to the backend after most of the research. I’d build a thin end-to-end slice with stub responses in the first two sprints.
- **Latency was masked, not solved.** Hosted inference gave 2–5 s per response and 8% errors at 20 users, and we covered it with a “Thinking…” indicator. A smaller or cached model for NPC–NPC chatter would have been worth testing.
- **The evaluation was weak.** Absolute persona and lore scores were low (about 0.10–0.25), and we scored Turkish dialogue with an embedding model trained mostly on English. The scores are fine for comparing models but say little about quality. I’d add human ratings.
