export const player = (state = []) => {
  let i = 0;
  let j = 0;
  state.map((element) => {
    if (element == "X") {
      i++;
    } else if (element == "O") {
      j++;
    }
  });
  return i > j ? "O" : "X";
};
export const actions = (state = []) => {
  let finalSet = [];
  for (let i = 0; i < state.length; i++) {
    if (state[i] == "") {
      finalSet.push(i);
    }
  }
  return finalSet;
};
export const result = (state, i) => {
  let clone = [...state];
  islegal(clone, i) ? (clone[i] = player(clone)) : clone;
  return clone;
};
export const terminal = (state) => {
  if (state[0] == state[1] && state[1] == state[2] && state[0] != "") {
    return true;
  }
  if (state[3] == state[4] && state[4] == state[5] && state[3] != "") {
    return true;
  }
  if (state[6] == state[7] && state[7] == state[8] && state[6] != "") {
    return true;
  }
  if (state[0] == state[3] && state[3] == state[6] && state[0] != "") {
    return true;
  }
  if (state[1] == state[4] && state[4] == state[7] && state[1] != "") {
    return true;
  }
  if (state[2] == state[5] && state[5] == state[8] && state[2] != "") {
    return true;
  }
  if (state[0] == state[4] && state[4] == state[8] && state[0] != "") {
    return true;
  }
  if (state[2] == state[4] && state[4] == state[6] && state[2] != "") {
    return true;
  }
  if (state.every((cell) => cell !== "")) {
    return true;
  }
  return false;
};
export const utility = (state) => {
  if (state[0] == state[1] && state[1] == state[2] && state[0] != "") {
    return state[0] == "X" ? 1 : -1;
  }
  if (state[3] == state[4] && state[4] == state[5] && state[3] != "") {
    return state[3] == "X" ? 1 : -1;
  }
  if (state[6] == state[7] && state[7] == state[8] && state[6] != "") {
    return state[6] == "X" ? 1 : -1;
  }
  if (state[0] == state[3] && state[3] == state[6] && state[0] != "") {
    return state[0] == "X" ? 1 : -1;
  }
  if (state[1] == state[4] && state[4] == state[7] && state[1] != "") {
    return state[1] == "X" ? 1 : -1;
  }
  if (state[2] == state[5] && state[5] == state[8] && state[2] != "") {
    return state[2] == "X" ? 1 : -1;
  }
  if (state[0] == state[4] && state[4] == state[8] && state[0] != "") {
    return state[0] == "X" ? 1 : -1;
  }
  if (state[2] == state[4] && state[4] == state[6] && state[2] != "") {
    return state[2] == "X" ? 1 : -1;
  }
  return 0;
};
export const islegal = (state, i) => {
  return state[i] == "";
};
export const minimax = (state, depth, isMaximizing) => {
  if (terminal) {
    const score = utility(state);
    if (score === 1) return score - depth;
    if (score === -1) return score + depth;
    if (actions(state).length === 0) return 0;
  }

  if (isMaximizing) {
    let best = -Infinity;
    actions(state).forEach((index) => {
      let clonestate = [...state];
      clonestate[index] = "X";
      best = Math.max(best, minimax(clonestate, depth + 1, false));
      clonestate[index] = "";
    });
    return best;
  } else {
    let best = Infinity;
    actions(state).forEach((index) => {
      let clonestate = [...state];
      clonestate[index] = "O";
      best = Math.min(best, minimax(clonestate, depth + 1, true));
      clonestate[index] = "";
    });
    return best;
  }
};
export const bestMove = (state) => {
  let bestVal = -Infinity;
  let move = -1;
  if (actions(state).length === 8 && state[4] === "") {
    return 4;
  }
  actions(state).forEach((index) => {
    let clonestate = [...state];
    clonestate[index] = "X";
    const moveVal = minimax(clonestate, 0, false);
    clonestate[index] = "";
    if (moveVal > bestVal) {
      move = index;
      bestVal = moveVal;
    }
  });
  return move;
};
export const initialState = ["", "", "", "", "", "", "", "", ""];
bestMove(initialState);
