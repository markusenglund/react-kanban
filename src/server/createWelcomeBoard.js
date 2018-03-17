import shortid from "shortid";

export default function createWelcomeBoard() {
  const welcomeCards = [
    {
      title: `![Octocat](https://assets-cdn.github.com/images/modules/logos_page/Octocat.png)
      Check out the [source code on GitHub](https://github.com/yogaboll/react-kanban-board)
      `,
      color: "powderblue"
    },
    {
      title: `## Supports GitHub flavored markdown
Featuring cutting edge HTML features like
* Headings
* Bullet points
* **Bold** and *italic* text
* Links
* Images
* \`\`\`() => {
    // Code blocks
}\`\`\`

Watch out, Netscape navigator 2.0!`
    },
    // OTHER FEATURES: Full mobile support and usable with keyboard. Suck on that, trello.
    {
      title:
        "Give your card a due date and a color because you're a busy business person but also a fun, approachable guy or girl who gives some cards a vaguely green color.",
      date: new Date(),
      color: "aquamarine"
    }
  ].map(card => ({ color: "white", _id: shortid.generate(), ...card }));

  const howToUseCards = [
    {
      title:
        "A board consists of multiple lists with cards. Cards can be moved within a list or between lists by dragging them"
    },
    { title: "You can edit the contents of a card by clicking on it." },
    {
      title: "You can also give the cards a different color.",
      color: "yellow"
    },
    { title: "You can also give them a deadline", date: new Date() },
    { title: "The site supports markdown" },
    {
      title: `Check out the source code on [GitHub](https://github.com/yogaboll/react-kanban-board)`
    }
  ].map(card => ({ color: "white", _id: shortid.generate(), ...card }));

  return {
    _id: shortid.generate(),
    title: "Welcome to kanban.live!",
    color: "blue",
    lists: [
      {
        _id: shortid.generate(),
        title: "A trello-like app built with React.js and friends",
        cards: welcomeCards
      },
      { _id: shortid.generate(), title: "How to use", cards: howToUseCards }
    ],
    users: []
  };
}
