const reorganizeData = data => {
  /* eslint-disable camelcase */
  const boardsById = data.reduce(
    (boards, { board_id, board_title, list_id }) => {
      if (!boards[board_id]) {
        return {
          ...boards,
          [board_id]: {
            id: board_id,
            title: board_title,
            lists: list_id ? [list_id] : []
          }
        };
      }
      if (list_id !== null && !boards[board_id].lists.includes(list_id)) {
        return {
          ...boards,
          [board_id]: {
            ...boards[board_id],
            lists: [...boards[board_id].lists, list_id]
          }
        };
      }
      return boards;
    },
    {}
  );
  const listsById = data.reduce((lists, { list_id, list_title, card_id }) => {
    if (!lists[list_id]) {
      return {
        ...lists,
        [list_id]: {
          id: list_id,
          title: list_title,
          cards: card_id ? [card_id] : []
        }
      };
    }
    if (card_id !== null && !lists[list_id].cards.includes(card_id)) {
      return {
        ...lists,
        [list_id]: {
          ...lists[list_id],
          cards: [...lists[list_id].cards, card_id]
        }
      };
    }
    return lists;
  }, {});
  const cardsById = data.reduce(
    (cards, { card_id, card_title }) => ({
      ...cards,
      [card_id]: { id: card_id, title: card_title }
    }),
    {}
  );

  return { boardsById, listsById, cardsById };
  /* eslint-enable camelcase */
};

export default reorganizeData;
