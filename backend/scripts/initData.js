const mongoose = require("mongoose");
const Audiobook = require("../models/Audiobook");

mongoose.connect("mongodb://146.56.51.1:27017/audiobook-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const audiobooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://i.ibb.co/WgKbcB9/gatsby.jpg",
    description:
      "A novel set in the Roaring Twenties. The story follows Jay Gatsby, a mysterious millionaire known for his lavish parties and unrequited love for Daisy Buchanan. Through the eyes of narrator Nick Carraway, the novel explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Jazz Age.",
    genre: "Fiction",
    rating: 0,
    reviews: [],
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage:
      "https://i.ibb.co/3svq6t4/to-Kill-a-Mockingbird-first-edition-cover.jpg",
    description:
      "A novel about racial injustice in the Deep South. The story is told through the perspective of Scout Finch, a young girl whose father, Atticus Finch, is a lawyer defending a black man wrongly accused of raping a white woman. The novel addresses complex themes such as racial prejudice, moral growth, and the innocence of childhood, making it a profound and enduring work of American literature.",
    genre: "Fiction",
    rating: 0,
    reviews: [],
  },
  {
    title: "1984",
    author: "George Orwell",
    coverImage: "https://i.ibb.co/vVPmMGK/orwelll-1984.jpg",
    description:
      "A dystopian novel about totalitarianism. The story is set in a superstate called Oceania, where the Party, led by Big Brother, exercises total control over the population. The protagonist, Winston Smith, works for the Party rewriting history to fit its narrative. The novel explores themes of surveillance, government control, loss of individuality, and the impact of propaganda.",
    genre: "Science Fiction",
    rating: 0,
    reviews: [],
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    coverImage: "https://i.ibb.co/1GJv735/moby-dick.jpg",
    description:
      "A novel about the voyage of the whaling ship Pequod. Led by the obsessive Captain Ahab, the crew embarks on a perilous journey to hunt the elusive white whale, Moby-Dick. The novel delves into themes of revenge, humanity's relationship with nature, fate, and the limits of knowledge. It is a complex and multifaceted narrative that combines adventure with philosophical inquiry.",
    genre: "Adventure",
    rating: 0,
    reviews: [],
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://i.ibb.co/Z6qVQCL/pride-and.jpg",
    description:
      "A romantic novel about manners and marriage. The story revolves around Elizabeth Bennet, a strong-willed young woman, and her evolving relationship with the wealthy and reserved Mr. Darcy. Through wit and satire, the novel critiques the social norms and class structures of 19th-century England while exploring themes of love, reputation, and the importance of self-awareness and growth.",
    genre: "Romance",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://i.ibb.co/FYw5V1L/catcher-rye.jpg",
    description:
      "A novel narrated by Holden Caulfield, a teenager grappling with the challenges of adolescence. The story follows Holden as he navigates his way through New York City after being expelled from prep school. His cynical and often disillusioned perspective captures the confusion and angst of teenage life, making it a powerful exploration of identity, alienation, and the struggles of growing up.",
    genre: "Fiction",
    rating: 0,
    reviews: [],
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    coverImage: "https://i.ibb.co/qYvsFbB/sorcerer-stone.jpg",
    description:
      "The first book in the Harry Potter series, following young wizard Harry's adventures at Hogwarts School of Witchcraft and Wizardry. Upon discovering his magical heritage, Harry embarks on a journey filled with spells, mythical creatures, and the challenges of growing up. The novel introduces a richly detailed world and sets the stage for Harry's epic struggle against the dark wizard Voldemort.",
    genre: "Fantasy",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    coverImage: "https://i.ibb.co/tY7KVmC/fellowship-of-ring.jpg",
    description:
      "The first part of the epic fantasy trilogy where Frodo Baggins sets out on a quest to destroy a powerful ring. Joined by a diverse group of companions, Frodo must navigate a perilous journey across Middle-earth, facing dark forces and ancient evils. The novel blends high fantasy with deep themes of friendship, sacrifice, and the struggle between good and evil.",
    genre: "Fantasy",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    coverImage: "https://i.ibb.co/m5p6qc8/the-girl-with-the-dra.jpg",
    description:
      "A gripping thriller featuring investigative journalist Mikael Blomkvist and hacker Lisbeth Salander. Together, they uncover dark secrets and corruption within Swedish society while investigating the disappearance of a wealthy man's niece decades earlier. The novel weaves intricate plotlines with complex characters, exploring themes of abuse, justice, and revenge.",
    genre: "Mystery, Thriller",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverImage: "https://i.ibb.co/G719bXm/da-vinci-code.jpg",
    description:
      "A mystery thriller involving symbologist Robert Langdon as he unravels secrets hidden in famous artworks. The story takes readers on a fast-paced adventure through Europe, uncovering a conspiracy tied to the Catholic Church. The novel blends historical fact with fiction, creating a compelling narrative that challenges readers to question accepted truths.",
    genre: "Mystery, Thriller",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    coverImage: "https://i.ibb.co/LdjpFnT/lion-witch.jpg",
    description:
      "The first book in the Chronicles of Narnia series, where four siblings discover a magical world. Through a wardrobe, they enter Narnia, a land ruled by the evil White Witch who has cast it into eternal winter. With the help of the great lion Aslan, they embark on a quest to save Narnia, exploring themes of courage, faith, and redemption.",
    genre: "Fantasy",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    coverImage: "https://i.ibb.co/5YSLPLp/hunger-games.jpg",
    description:
      "A dystopian novel set in a post-apocalyptic world where teenagers fight to the death in an annual event. Katniss Everdeen, a girl from the impoverished District 12, volunteers to take her sister's place in the Hunger Games. The novel explores themes of survival, sacrifice, and the impacts of violence and media in a totalitarian society, making it a gripping and thought-provoking read.",
    genre: "Science Fiction",
    rating: 0,
    reviews: [],
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    coverImage: "https://i.ibb.co/tcxBtzB/gone-girl.jpg",
    description:
      "A psychological thriller about a woman who disappears on her fifth wedding anniversary, leaving her husband as the prime suspect. The story unfolds through alternating perspectives of the husband and the missing wife, revealing dark secrets and manipulations. It delves into themes of marriage, deception, and the nature of truth, creating a tense and unpredictable narrative.",
    genre: "Mystery, Thriller",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    coverImage: "https://i.ibb.co/BL036SJ/the-martian.jpg",
    description:
      "A science fiction novel about an astronaut stranded on Mars and his struggle for survival. Mark Watney, the protagonist, is left behind by his crew after a dust storm forces an emergency evacuation. Using his ingenuity and scientific knowledge, Watney battles isolation, harsh environment, and limited resources to stay alive. ",
    genre: "Science Fiction",
    rating: 0,
    reviews: [],
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    coverImage: "https://i.ibb.co/HG2zR2L/handmaid.jpg",
    description:
      "A dystopian novel set in a future totalitarian society where women are oppressed and used for reproduction. Offred, the protagonist, is a Handmaid in the Republic of Gilead, where fertility is prized above all else. The novel explores themes of power, control, gender roles, and the consequences of fundamentalism.",
    genre: "Science Fiction",
    rating: 0,
    reviews: [],
  },
];

Audiobook.insertMany(audiobooks)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
