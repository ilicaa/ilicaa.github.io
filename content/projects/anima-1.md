---
title: Anima-1
pitch: "A dark-fantasy action RPG where the final boss learns how you fight and uses your habits against you."
status: In development
tracks: [production]
tags: []
order: 2

# Quick facts — shown exactly as written. List only what you personally did.
role: Producer
contributions:
  - Planned and dated whole work plan.
  - Contributed to design core gameplay and final boss.
teamSize: 3
duration: "Sep 2026 – present"
tools: [Unreal Engine, Jira, Google Docs]

gallery:            # section: overview | role | process | decisions | results | retrospective | media
  - src: ../media/anima-1/anima1-concept1.jpg
    alt: "First concept design of Anima-1"
    caption: "First concept design of Anima-1"
    section: media
  - src: ../media/anima-1/anima1-concept2.jpg
    alt: "Realistic concept art of Anima-1"
    caption: "Concept design of Anima-1"
    section: media
  - src: ../media/anima-1/anima1-production1.png
    alt: "First sprints of Anima-1 production"
    caption: "First sprints of Anima-1 production"
    section: process
  - src: ../media/anima-1/anima1-production2.png
    alt: "Sprints of Anima-1 Production"
    caption: "Other sprints of Anima-1 Production"
    section: process
  - src: ../media/anima-1/anima1-production3.png
    alt: "Sprints of Anima-1 Production 2"
    caption: "Other sprints of Anima-1 Production."
    section: process
  
thumbnail: { src: ../media/anima-1/anima1-concept2.jpg, alt: "Anima-1" }
# See content/projects/genai-npc.md for commented examples of every media/planning field.
---

## Overview and goals

Anima I is a story-driven dark-fantasy action RPG with soulslike combat. A medieval village is attacked at night by giant spiders. A young villager grabs a sword and a torch to protect their wounded family, and discovers that something in the dark is watching and learning.

Combat is built on stamina: light and heavy attacks, blocking, dodging, and a parry that costs nothing. The central idea is a boss that records how the player fights and counters their dominant habit, and the same profile then picks the ending.

Goals for the 12-week project:
- Deliver a packaged, playable build that shows the adaptive boss fight end to end.
- Run a playtest and cut a trailer for the final presentation on 14 January.
- Learn Unreal as a team and keep scope honest enough to actually finish.

The long-term vision is larger: several zones, dungeons, quests that depend on a melee or magic playstyle, and a branching story. The 12-week project covers the core fight.

## My role and contributions

I only did the production work yet on a three-person team.
- Planned the project in Jira: four epics, 32 stories and 95 sub-tasks, estimated in story points.
- Built the sprint plan around the four presentations and set two checkpoints to compare real progress with the plan.
- Compared scope against team capacity and set a fixed order for cutting features.
- Suggested the Adaptive Boss section and accepted by the team.

There will be contributions on Unreal side from me in the upcoming weeks...

## Process and planning

The project runs for 12 weeks, until 14 January, in six two-week sprints built around four presentations: the proposal on 22 October, progress presentations on 19 November and 17 December, and the final presentation with a trailer on 14 January.

- **Sprint 1:** setup, getting hands on Unreal, and the interface contract between the tracks.
- **Sprint 2:** moveset, camera and arena.
- **Sprint 3:** block, parry, health, stamina and the first spider.
- **Sprint 4:** boss framework, and recording how the player fights.
- **Sprint 5:** the boss counters the player’s habits, and the endings.
- **Sprint 6:** packaged build, playtest and trailer.

The work is organized in four epics (Player, Enemies and bosses, World and systems, Team and milestones). One story point equals four hours.

## Key design decisions

1. **A boss that reads combat style.** The game records habits such as parrying, and the direction and distance of dodges. The finale boss counters the dominant habit with telegraphed, dodgeable attacks, and the same profile selects the ending. Games like Shadow of Middle-earth (which remembers who beat you) and Left 4 Dead’s AI Director (which adjusts pacing to player stress) adapt to the player, but as far as we know neither reads combat style. Telegraphed, dodgeable counters keep the fight fair, and being predictable becomes the main challenge.
2. **One free action.** Every action costs stamina except the parry. Light attacks are fast and weak, heavy attacks are slower and stronger, blocking only reduces damage, and dodging escapes unblockable hits or opens distance. Making the parry free rewards timing and risk over turtling.
3. **A plan that is tight on purpose, with a cut order.** Rather than hide the gap between scope (400 hours) and realistic capacity (about 300), the plan states it, orders the features that will be cut first, and sets checkpoints where cuts are decided.

## Results

The project is in pre-production, so there are no gameplay results yet.

- **Done:** the project pitch, a full Jira plan (4 epics, 32 stories, 95 sub-tasks), a sprint schedule tied to the four presentations, and a scope-versus-capacity analysis.
- **In progress:** Sprint 1, covering setup, Unreal onboarding and the interface contract.
- **Next:** I will log planned against actual effort and the features cut at the checkpoints on 12 November and 10 December, and update this section after each presentation.

