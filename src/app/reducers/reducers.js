const initialCardState = {
  qwer: {
    title: "Inspect how trello deals with loading boards, images",
    id: "qwer"
  },
  asdf: {
    title: "Make skeleton structure of whatever",
    id: "asdf"
  },
  zxcv: {
    title: "Do some stuff",
    id: "zxcv"
  },
  lkjhag: {
    title:
      "Maybe a really really long one: How should I manage board state, and generally state for components that are the same but have different data?",
    id: "lkjhag"
  }
};

const initialListState = {
  lgrnrirgi: {
    title: "TODO Big picture",
    id: "lgrnrirgi",
    cards: ["qwer", "asdf"]
  },
  ogtpokpr: {
    title: "TODO details",
    id: "ogtpokpr",
    cards: ["zxcv", "lkjhag"]
  }
};

const cards = (state = initialCardState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const lists = (state = initialListState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const counter = (state = 1, action) => {
  switch (action.type) {
    case "INCREMENT": {
      return state + 2;
    }
    default:
      return state;
  }
};

export default { counter, cards, lists };
