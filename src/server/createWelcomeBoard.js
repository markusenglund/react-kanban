import shortid from "shortid";

function appendAttributes(list) {
  return list.map(card => ({
    color: "white",
    _id: shortid.generate(),
    ...card
  }));
}

export default function createWelcomeBoard(userId) {
  const welcomeCards = [
    {
      title: `![Octocat](https://assets-cdn.github.com/images/modules/logos_page/Octocat.png)
      Check out the [source code on GitHub](https://github.com/yogaboll/react-kanban-board)
      `,
      color: "powderblue"
    },
    {
      title: "### Full support for touch screens and keyboard navigation."
    },
    {
      title: `### Supports GitHub flavored markdown
Featuring cutting edge HTML features like
* Headings
* Bullet points
* **Bold** and *italic* text
* Links
* Images
* \`\`\`
() => {
    // Code blocks
}
\`\`\`
* [x] Checkboxes

Watch out, Netscape navigator 2.0!`
    }
  ];

  const howToUseCards = [
    {
      title: `### Drag cards and lists
Of course you can reposition both the cards and the lists by dragging them with a mouse or touch gesture, but you can also do it with just the keyboard. Try it out by focusing a card or list title, pressing Space bar and use the arrow keys to reposition the card or list`
    },
    {
      title: `### Create a card or list
Add a new card to an existing list by clicking the + button below each list. You can add a new list by clicking the "Add a list"-button to the right`
    },
    {
      title: `### Edit a card
You can edit the contents of a card by clicking on it or focusing it and pressing the Enter key. From this menu you can also give your card a color and a due date, or delete the card.`,
      color: "pink",
      date: new Date()
    },
    {
      title: `### Add a checklist
For a task that has many sub-tasks, you can create a checklist with markdown.
[ ] List this
[x] And like this!`
    },
    {
      title: `### Change the board
You can edit the title of the board by clicking it. You can also change the color of the board by clicking the button in the top right corner.`
    }
  ];
  if (!userId) {
    howToUseCards.unshift({
      title: `### Sign in to save changes
Since you are not signed in, your changes will not persist after you leave the website. Go back to the login screen by pressing the 'Sign in' button in the top right corner.`
    });
  }

  return {
    _id: shortid.generate(),
    title: "Welcome to kanban.live!",
    color: "blue",
    lists: [
      {
        _id: shortid.generate(),
        title: "A trello-like app built with React",
        cards: appendAttributes(welcomeCards)
      },
      {
        _id: shortid.generate(),
        title: "How to use",
        cards: appendAttributes(howToUseCards)
      }
    ],
    users: userId ? [userId] : []
  };
}
