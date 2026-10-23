---
title: Pan!c at the Server
pitch: "A 1990s night shift in a server farm where the dark drains your sanity and your flashlight is dying."
status: Concept
tracks: [design]
tags: [Horror, First-person, GDD, Level design]
order: 3

# Quick facts — shown exactly as written. List only what you personally did.
role: Game Designer
# Your draft wording from the brief, to finalize:
# "I designed most of the gameplay and early levels; narrative and original concept are by a teammate."
contributions:
  - Designed and finalized the core loop and core systems.
credits:
  - { who: "Ahmet Akın", what: "Narrative and original concept" }
teamSize: 2
duration: "Mar – May 2026"
tools: []

# See content/projects/genai-npc.md for commented examples of every media/planning field.
---

## Overview and goals

Pan!c at the Server is a single-player, first-person psychological horror game set in a remote late-1990s server facility. You play a night-shift maintenance technician who has to repair humming servers in pitch-black aisles while your sanity drains. As it drops, reality starts to warp, and a twist reframes the whole night.

It is aimed at players aged 14+ who like short, dense narrative experiences, retro analog atmosphere and first-person psychological horror, the audience of games like Five Nights at Freddy’s and Firewatch.

Goals:
- Build tension from a resource loop rather than jump scares: light, battery and sanity pulling against each other.
- Deliver a tight, filler-free 2–4 hour experience as a premium indie title, with no in-game purchases.
- Keep the MVP small enough for a small team: PC first, English only, three core systems.

## My role and contributions

Designed and finalized the core loop and core systems.

## Process and planning

Currently project is on hold.

## Key design decisions

1. **Sanity and light are one system.** Sanity drains in the dark aisles and recovers only in the lit office, so the player is always deciding how long to stay out. The penalty is felt rather than shown: low sanity triggers escalating hallucinations and time distortions, not just a lower number on a bar. (Drain and recovery rates are not defined yet. They are the first thing to tune in a prototype.)
2. **A second resource works against the first.** The flashlight battery degrades, so the light you need to work and to stay calm is itself running out. Energy boosts (coffee or an energy drink) restore sanity at a cost. We took the light-and-power tension from Five Nights at Freddy’s but let the player move, so the game is about exploring and working under pressure, not waiting.
3. **Audio carries the horror.** Server hum, fans and analog phones start out ordinary, then slowly distort into whispers and corrupted audio logs as sanity falls. This needs an audio system driven by the sanity value, and it is the main reason the game relies on atmosphere rather than shocks.
4. **A tight, repeatable loop and scope.** A safe office and dark danger zones give a clear rhythm: check the task board, go out, repair servers (using real Linux commands to diagnose them), return to recover. Short, dense and PC-first keeps the MVP achievable.

## Status

MVP design is complete and documented in a full GDD. There is no playable build yet.
