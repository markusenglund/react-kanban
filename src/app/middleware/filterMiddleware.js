const filterMiddleware = store => next => action => {
    next(action);
    const {
        user,
        cardsById,
        currFilter
      } = store.getState();

    if (user) {
        if (action.type.includes("CARD")) {
            let matchingCardsById = {};

            Object.keys(cardsById).forEach(cardId => {
              if ((cardsById[cardId].text || '').toLowerCase().includes(currFilter.toLowerCase())) {
                matchingCardsById[cardId] = cardsById[cardId];
              }
            });
            store.dispatch({
                type: "UPDATE_FILTER", 
                payload: matchingCardsById
            })
        }
    }
};

export default filterMiddleware;