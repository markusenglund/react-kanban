import shortid from "shortid";

// Give every card in a list an _id and the color white UNLESS those properties already exist
const appendAttributes = list =>
  list.map(card => ({
    color: "white",
    _id: shortid.generate(),
    ...card
  }));

// Generate the initial showcase board that every user and guest gets when they first log in
const createWelcomeBoard = userId => {
  const list1 = [
    {
      text: `![Octocat](https://assets-cdn.github.com/images/modules/logos_page/Octocat.png)
Check out the [source code on GitHub](https://github.com/yogaboll/react-kanban)
`,
      color: "#6df"
    },
    {
      text: "### Full support for touch screens and keyboard navigation."
    },
    {
      text: `### Supports GitHub flavored markdown
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

  const list2 = [
    {
      text: `### Drag cards and lists
Of course you can reposition both the cards and the lists by dragging them with a mouse or touch gesture, but you can also do it with just the keyboard. Try it out by focusing a card or list title, pressing Space bar and use the arrow keys to reposition the card or list`
    },
    {
      text: `### Create a card or list
Add a new card to an existing list by clicking the + button below each list. You can add a new list by clicking the "Add a list"-button to the right`
    },
    {
      text: `### Edit a card
You can edit the contents of a card by clicking on it or focusing it and pressing the Enter key. From this menu you can also give your card a color and a due date, or delete the card.`,
      color: "#ff6",
      date: new Date()
    },
    {
      text: `### Add a checklist
For a task that has many sub-tasks, you can create a checklist with markdown.
[ ] List this
[x] And like this!`
    },
    {
      text: `### Change the board
You can edit the title of the board by clicking it. You can also change the color of the board by clicking the button in the top right corner.`
    }
  ];

  // Append a warning message to the top of list2 for guest users only
  if (!userId) {
    list2.unshift({
      text: `### Sign in to save changes
Since you are not signed in, your changes will not persist after you leave the website. Go back to the login screen by pressing the 'Sign in' button in the top right corner.`
    });
  }

  return {
    _id: shortid.generate(),
    title: "Welcome to React Kanban!",
    color: "blue",
    lists: [
      {
        _id: shortid.generate(),
        title: "A trello-like app built with React",
        cards: appendAttributes(list1)
      },
      {
        _id: shortid.generate(),
        title: "How to use",
        cards: appendAttributes(list2)
      }
    ],
    users: userId ? [userId] : []
  };
};

export default createWelcomeBoard;
