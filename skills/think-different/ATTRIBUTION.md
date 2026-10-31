# Attribution

luckiest-think-different is adapted from "The Alien Space of Science: Sampling
Coherent but Cognitively Unavailable Research Directions" (arXiv:2603.01092) and
its code, https://github.com/alejandrohdez00/alien-space-of-science (sha 39cbccc),
used under the MIT license (see LICENSE-alien).

Taken from upstream: the atom pipeline (methodology summary, atom extraction,
rating and refinement, super-atom naming), the proposal prompt, the
coherence-versus-unavailability ranking `(1 - beta) z(coherence) + beta z(unavailability)`
with beta 0.7 and k = 3, and the finding that LLM selection of "novel" combinations
underperforms sampling plus scoring.

Luckiest-edition changes (prompt-only pipeline, random sampling script,
source-overlap and model-judged unavailability estimate, coherence floor, safety
rules, proposal sections) are (c) luckiest, MIT licensed.
