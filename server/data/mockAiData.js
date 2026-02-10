/**
 * Pre-built AI synthesis data for testing when API quota is exhausted.
 * Keyed by YouTube video ID.
 */

const MOCK_DATA = {
    // MongoDB: https://youtu.be/4EjKroJCpFA
    "4EjKroJCpFA": {
        summary: "MongoDB is a NoSQL document-based database that stores data in flexible JSON-like documents (BSON). Unlike relational databases, it doesn't require fixed schemas, making it ideal for agile development. Key features include collections, documents, CRUD operations, indexing, and aggregation pipelines.",
        knowledge_graph: [
            { term: "MongoDB", group: 1, definition: "A NoSQL document-oriented database that uses JSON-like documents with optional schemas" },
            { term: "NoSQL", group: 1, definition: "A category of databases that don't use traditional SQL table-based relational models" },
            { term: "Document", group: 2, definition: "A record in MongoDB stored as BSON (Binary JSON) with key-value pairs" },
            { term: "Collection", group: 2, definition: "A group of MongoDB documents, equivalent to a table in relational databases" },
            { term: "BSON", group: 2, definition: "Binary JSON — MongoDB's internal format for storing documents efficiently" },
            { term: "CRUD Operations", group: 1, definition: "Create, Read, Update, Delete — the four basic database operations" },
            { term: "Schema", group: 2, definition: "The structure/blueprint of data — MongoDB allows flexible, dynamic schemas" },
            { term: "Indexing", group: 2, definition: "Creating indexes on fields to speed up query performance dramatically" },
            { term: "Aggregation Pipeline", group: 2, definition: "A framework for data processing with stages like $match, $group, $sort" },
            { term: "Mongoose", group: 1, definition: "An ODM (Object Data Modeling) library for MongoDB and Node.js" },
            { term: "Replica Set", group: 2, definition: "A group of MongoDB servers that maintain the same data for redundancy" },
            { term: "Sharding", group: 2, definition: "Distributing data across multiple machines for horizontal scaling" }
        ],
        interactive_timeline: [
            { timestamp: 0, label: "What is MongoDB?", deep_dive: "MongoDB was created in 2007 by the company 10gen, now called MongoDB Inc." },
            { timestamp: 120, label: "SQL vs NoSQL", deep_dive: "NoSQL databases can handle unstructured data 10x faster than traditional SQL for certain workloads." },
            { timestamp: 300, label: "Documents & Collections", deep_dive: "A single MongoDB document can be up to 16MB in size." },
            { timestamp: 480, label: "CRUD Operations", deep_dive: "MongoDB's insertMany() can insert thousands of documents in a single operation." },
            { timestamp: 720, label: "Queries & Filters", deep_dive: "MongoDB supports over 30 query operators including $regex, $in, and $exists." },
            { timestamp: 960, label: "Indexing", deep_dive: "Without indexes, MongoDB must scan every document — indexes can make queries 100x faster." },
            { timestamp: 1200, label: "Aggregation", deep_dive: "The aggregation pipeline can process millions of documents through multiple transformation stages." },
            { timestamp: 1500, label: "Mongoose & Node.js", deep_dive: "Mongoose adds schema validation to MongoDB, giving you the best of both structured and flexible worlds." }
        ],
        quiz_bank: [
            {
                question: "What type of database is MongoDB?",
                options: ["Relational (SQL)", "Document-oriented (NoSQL)", "Graph database", "Key-value store"],
                answer: 1,
                distractor_explanation: "MongoDB is a document-oriented NoSQL database, not relational."
            },
            {
                question: "What format does MongoDB use to store documents?",
                options: ["XML", "CSV", "BSON (Binary JSON)", "Plain text"],
                answer: 2,
                distractor_explanation: "MongoDB stores data as BSON, which is a binary representation of JSON."
            },
            {
                question: "What is a Collection in MongoDB equivalent to in SQL?",
                options: ["A row", "A column", "A table", "A database"],
                answer: 2,
                distractor_explanation: "A collection in MongoDB is similar to a table in relational databases."
            },
            {
                question: "Which library is commonly used as an ODM for MongoDB with Node.js?",
                options: ["Sequelize", "Prisma", "Mongoose", "TypeORM"],
                answer: 2,
                distractor_explanation: "Mongoose is the most popular ODM for MongoDB in Node.js applications."
            },
            {
                question: "What does CRUD stand for?",
                options: ["Connect, Read, Update, Deploy", "Create, Read, Update, Delete", "Cache, Render, Upload, Download", "Compile, Run, Upload, Debug"],
                answer: 1,
                distractor_explanation: "CRUD represents the four fundamental database operations."
            }
        ],
        the_gravity_shift: "Think of MongoDB like a filing cabinet where each folder (document) can have different types of papers inside — unlike a spreadsheet (SQL) where every row must have the exact same columns."
    },

    // Redox Reactions: https://youtu.be/lQ6FBA1HM3s
    "lQ6FBA1HM3s": {
        summary: "Redox reactions involve the transfer of electrons between chemical species. Oxidation is the loss of electrons (increase in oxidation state), while reduction is the gain of electrons (decrease in oxidation state). These reactions are fundamental to batteries, corrosion, metabolism, and photosynthesis.",
        knowledge_graph: [
            { term: "Redox Reaction", group: 1, definition: "A chemical reaction involving transfer of electrons between two species" },
            { term: "Oxidation", group: 1, definition: "Loss of electrons by a molecule, atom, or ion — oxidation state increases" },
            { term: "Reduction", group: 1, definition: "Gain of electrons by a molecule, atom, or ion — oxidation state decreases" },
            { term: "Oxidizing Agent", group: 2, definition: "The substance that gets reduced (gains electrons) and causes oxidation in another" },
            { term: "Reducing Agent", group: 2, definition: "The substance that gets oxidized (loses electrons) and causes reduction in another" },
            { term: "Oxidation State", group: 2, definition: "The hypothetical charge an atom would have if all bonds were fully ionic" },
            { term: "Half Reaction", group: 2, definition: "Either the oxidation or reduction part of a redox reaction written separately" },
            { term: "Electrochemical Cell", group: 2, definition: "A device that converts chemical energy to electrical energy using redox reactions" },
            { term: "OIL RIG", group: 1, definition: "Mnemonic: Oxidation Is Loss, Reduction Is Gain (of electrons)" },
            { term: "Corrosion", group: 2, definition: "The gradual destruction of metals by redox reactions with their environment" },
            { term: "Electrolysis", group: 2, definition: "Using electrical energy to drive a non-spontaneous redox reaction" }
        ],
        interactive_timeline: [
            { timestamp: 0, label: "What is Redox?", deep_dive: "The word 'redox' is a combination of 'reduction' and 'oxidation'." },
            { timestamp: 90, label: "Oxidation Explained", deep_dive: "Originally, oxidation only meant reacting with oxygen — the concept was later generalized to electron loss." },
            { timestamp: 200, label: "Reduction Explained", deep_dive: "In reduction, the oxidation number decreases ('reduces') — hence the name." },
            { timestamp: 350, label: "OIL RIG Mnemonic", deep_dive: "OIL RIG is the most popular mnemonic in chemistry: Oxidation Is Loss, Reduction Is Gain." },
            { timestamp: 500, label: "Oxidation States", deep_dive: "Fluorine always has an oxidation state of -1, making it the strongest oxidizing agent." },
            { timestamp: 680, label: "Balancing Redox", deep_dive: "The total electrons lost in oxidation must equal the total electrons gained in reduction." },
            { timestamp: 850, label: "Real-World Applications", deep_dive: "Your phone battery works entirely on redox reactions — lithium loses and gains electrons." },
            { timestamp: 1000, label: "Electrochemistry", deep_dive: "The first battery (Voltaic pile) was invented in 1800 using zinc and copper in a redox reaction." }
        ],
        quiz_bank: [
            {
                question: "What does oxidation involve?",
                options: ["Gaining electrons", "Losing electrons", "Gaining protons", "Losing neutrons"],
                answer: 1,
                distractor_explanation: "Oxidation is the loss of electrons (OIL — Oxidation Is Loss)."
            },
            {
                question: "What does OIL RIG stand for?",
                options: ["Oxygen In Liquid, Reaction In Gas", "Oxidation Is Loss, Reduction Is Gain", "Only Ions Link, Reactions Involve Gases", "Oxidation Increases Load, Reduction Increases Gain"],
                answer: 1,
                distractor_explanation: "OIL RIG is the classic mnemonic for remembering electron transfer direction."
            },
            {
                question: "An oxidizing agent _____ electrons.",
                options: ["Loses", "Gains", "Shares", "Destroys"],
                answer: 1,
                distractor_explanation: "An oxidizing agent gains electrons (gets reduced itself)."
            },
            {
                question: "Which is a real-world example of a redox reaction?",
                options: ["Dissolving sugar in water", "Rusting of iron", "Melting ice", "Boiling water"],
                answer: 1,
                distractor_explanation: "Rusting is iron being oxidized by oxygen — a classic redox reaction."
            },
            {
                question: "In a redox reaction, the total electrons lost must equal:",
                options: ["Total protons gained", "Total electrons gained", "Total neutrons", "Zero"],
                answer: 1,
                distractor_explanation: "Electron transfer is conserved — what's lost by one species is gained by another."
            }
        ],
        the_gravity_shift: "Imagine a game of catch with invisible balls (electrons). One player throws (oxidation = losing electrons), the other catches (reduction = gaining electrons). The thrower is the 'reducing agent' because they help the other player catch — confusing, but that's the trick!"
    },

    // Momentum: https://youtu.be/E13h1E_Pc00
    "E13h1E_Pc00": {
        summary: "Momentum is the product of an object's mass and velocity (p = mv). It is a vector quantity conserved in isolated systems. The law of conservation of momentum states that the total momentum before a collision equals the total momentum after, making it fundamental to understanding collisions, explosions, and rocket propulsion.",
        knowledge_graph: [
            { term: "Momentum", group: 1, definition: "Product of mass and velocity (p = mv), a vector quantity measured in kg·m/s" },
            { term: "Conservation of Momentum", group: 1, definition: "Total momentum of an isolated system remains constant before and after collisions" },
            { term: "Impulse", group: 1, definition: "Change in momentum, equal to force multiplied by time (J = FΔt = Δp)" },
            { term: "Elastic Collision", group: 2, definition: "A collision where both momentum AND kinetic energy are conserved" },
            { term: "Inelastic Collision", group: 2, definition: "A collision where momentum is conserved but kinetic energy is NOT conserved" },
            { term: "Newton's Third Law", group: 2, definition: "Every action has an equal and opposite reaction — the basis for momentum conservation" },
            { term: "Vector Quantity", group: 2, definition: "A quantity with both magnitude and direction (momentum has direction of velocity)" },
            { term: "Isolated System", group: 2, definition: "A system with no external forces acting on it — required for momentum conservation" },
            { term: "Recoil", group: 2, definition: "Backward momentum of a gun/cannon when it fires — conservation of momentum in action" },
            { term: "Center of Mass", group: 2, definition: "The average position of mass in a system — moves at constant velocity if no external force" },
            { term: "Rocket Propulsion", group: 2, definition: "Rockets work by expelling gas backward, gaining forward momentum by conservation" }
        ],
        interactive_timeline: [
            { timestamp: 0, label: "What is Momentum?", deep_dive: "Momentum was first described by John Philoponus in the 6th century, centuries before Newton." },
            { timestamp: 120, label: "Formula: p = mv", deep_dive: "A 0.15kg cricket ball at 150 km/h has the same momentum as a 1.5kg object at 15 km/h." },
            { timestamp: 280, label: "Impulse & Force", deep_dive: "Airbags save lives by increasing the collision time, reducing the force while keeping impulse constant." },
            { timestamp: 420, label: "Conservation Law", deep_dive: "Momentum conservation holds even in nuclear reactions and at relativistic speeds." },
            { timestamp: 600, label: "Elastic Collisions", deep_dive: "Perfectly elastic collisions only truly occur between subatomic particles — everyday collisions always lose some energy." },
            { timestamp: 780, label: "Inelastic Collisions", deep_dive: "When two clay balls collide and stick together, that's a perfectly inelastic collision." },
            { timestamp: 950, label: "Rocket Science", deep_dive: "A rocket in space can accelerate endlessly because it carries its own reaction mass." },
            { timestamp: 1100, label: "Problem Solving", deep_dive: "Most momentum problems are solved by setting total initial momentum equal to total final momentum." }
        ],
        quiz_bank: [
            {
                question: "What is the formula for momentum?",
                options: ["p = ma", "p = mv", "p = Fd", "p = mgh"],
                answer: 1,
                distractor_explanation: "Momentum (p) equals mass (m) times velocity (v)."
            },
            {
                question: "In which type of collision is kinetic energy conserved?",
                options: ["Inelastic", "Elastic", "Perfectly inelastic", "Explosive"],
                answer: 1,
                distractor_explanation: "Elastic collisions conserve both momentum and kinetic energy."
            },
            {
                question: "What is impulse equal to?",
                options: ["Mass × acceleration", "Change in momentum", "Force × distance", "Energy × time"],
                answer: 1,
                distractor_explanation: "Impulse equals the change in momentum (J = Δp = FΔt)."
            },
            {
                question: "Why do airbags reduce injury in car crashes?",
                options: ["They reduce momentum", "They increase collision time, reducing force", "They absorb all kinetic energy", "They increase the car's mass"],
                answer: 1,
                distractor_explanation: "Airbags increase the time over which momentum changes, reducing the peak force on the body."
            },
            {
                question: "How do rockets propel themselves in space?",
                options: ["By pushing against air", "By conservation of momentum — expelling gas backward", "By using gravity", "By magnetic fields"],
                answer: 1,
                distractor_explanation: "Rockets work by expelling mass backward; by conservation of momentum, the rocket moves forward."
            }
        ],
        the_gravity_shift: "Imagine you're standing on a skateboard holding a heavy ball. When you throw the ball forward, you roll backward. That's conservation of momentum — the total 'movement juice' stays the same, it just gets shared differently!"
    },

    // Matrices: https://youtu.be/bU1-GHz-ifk
    "bU1-GHz-ifk": {
        summary: "Matrices are rectangular arrays of numbers arranged in rows and columns used to represent and solve systems of linear equations. Key operations include addition, scalar multiplication, matrix multiplication, and finding determinants and inverses. Matrices are essential in computer graphics, physics, engineering, and machine learning.",
        knowledge_graph: [
            { term: "Matrix", group: 1, definition: "A rectangular array of numbers arranged in rows and columns" },
            { term: "Determinant", group: 1, definition: "A scalar value computed from a square matrix that indicates if the matrix is invertible" },
            { term: "Inverse Matrix", group: 1, definition: "A matrix A⁻¹ such that A × A⁻¹ = Identity matrix (only exists if det ≠ 0)" },
            { term: "Identity Matrix", group: 2, definition: "A square matrix with 1s on the diagonal and 0s elsewhere — the multiplicative identity" },
            { term: "Transpose", group: 2, definition: "Flipping a matrix over its diagonal — rows become columns and vice versa" },
            { term: "Matrix Multiplication", group: 1, definition: "Row-by-column dot product operation — order matters (AB ≠ BA generally)" },
            { term: "Square Matrix", group: 2, definition: "A matrix with equal number of rows and columns (n × n)" },
            { term: "Singular Matrix", group: 2, definition: "A square matrix with determinant = 0, meaning it has no inverse" },
            { term: "Row Echelon Form", group: 2, definition: "A simplified form of a matrix used for solving linear systems (Gaussian elimination)" },
            { term: "Eigenvalue", group: 2, definition: "A scalar λ where Av = λv — the factor by which the eigenvector is scaled" },
            { term: "Linear Transformation", group: 2, definition: "A function between vector spaces that preserves addition and scalar multiplication" }
        ],
        interactive_timeline: [
            { timestamp: 0, label: "What is a Matrix?", deep_dive: "The word 'matrix' comes from Latin meaning 'womb' — coined by James Sylvester in 1850." },
            { timestamp: 150, label: "Types of Matrices", deep_dive: "A 1×1 matrix is just a number, and a 1×n matrix is called a row vector." },
            { timestamp: 320, label: "Matrix Addition", deep_dive: "You can only add matrices of the same dimensions — add corresponding elements." },
            { timestamp: 480, label: "Matrix Multiplication", deep_dive: "Matrix multiplication is NOT commutative — AB ≠ BA in general, which surprises many students." },
            { timestamp: 650, label: "Determinants", deep_dive: "The determinant of a 2×2 matrix [a,b;c,d] is ad - bc — it tells you the area scaling factor." },
            { timestamp: 820, label: "Inverse Matrix", deep_dive: "Finding an inverse is like finding the 'undo' button for a matrix transformation." },
            { timestamp: 1000, label: "Solving Systems", deep_dive: "Cramer's Rule uses determinants to solve systems of equations without row reduction." },
            { timestamp: 1150, label: "Applications", deep_dive: "Every 3D video game uses 4×4 matrices to rotate, scale, and translate objects on screen." }
        ],
        quiz_bank: [
            {
                question: "What is a matrix?",
                options: ["A single equation", "A rectangular array of numbers in rows and columns", "A type of graph", "A vector quantity"],
                answer: 1,
                distractor_explanation: "A matrix is a rectangular arrangement of numbers in rows and columns."
            },
            {
                question: "What is the determinant of [[2,3],[1,4]]?",
                options: ["5", "11", "8", "6"],
                answer: 0,
                distractor_explanation: "det = (2×4) - (3×1) = 8 - 3 = 5"
            },
            {
                question: "When does a matrix NOT have an inverse?",
                options: ["When it's square", "When its determinant is 0", "When it has negative numbers", "When it's symmetric"],
                answer: 1,
                distractor_explanation: "A matrix with determinant = 0 is singular and has no inverse."
            },
            {
                question: "Is matrix multiplication commutative (AB = BA)?",
                options: ["Always yes", "Generally no", "Only for 2×2 matrices", "Only for identity matrices"],
                answer: 1,
                distractor_explanation: "In general, AB ≠ BA — the order of multiplication matters for matrices."
            },
            {
                question: "What is the identity matrix?",
                options: ["A matrix of all zeros", "A matrix with 1s on diagonal and 0s elsewhere", "A matrix equal to its transpose", "Any square matrix"],
                answer: 1,
                distractor_explanation: "The identity matrix has 1s on the main diagonal and 0s everywhere else."
            }
        ],
        the_gravity_shift: "A matrix is like a magic box — you put a shape in one side (a vector), and it comes out transformed (rotated, stretched, flipped) on the other side. The numbers in the matrix are the 'instructions' for how to transform it!"
    }
},

// Neural Networks: https://youtu.be/aircAruvnKk
"aircAruvnKk": {
    summary: "Neural networks are computing systems inspired by the biological brain, composed of layers of artificial neurons. Each neuron takes inputs, weights them, adds a bias, and passes the result through an activation function (like sigmoid or ReLU). The network 'learns' by adjusting these weights and biases to minimize error, allowing it to recognize patterns like handwritten digits.",
        knowledge_graph: [
            { term: "Neuron", group: 1, definition: "A computational unit that takes inputs, applies weights, adds bias, and fires an output" },
            { term: "Weight", group: 1, definition: "A number representing the strength of connection between two neurons" },
            { term: "Bias", group: 1, definition: "A value added to the weighted sum, shifting the activation function curve" },
            { term: "Activation Function", group: 2, definition: "A mathematical function (e.g., Sigmoid, ReLU) determining if a neuron 'fires'" },
            { term: "Layer", group: 2, definition: "A collection of neurons operating at the same depth (Input, Hidden, Output)" },
            { term: "Sigmoid", group: 2, definition: "An S-shaped function squishing outputs between 0 and 1, mimicking biological firing rates" },
            { term: "Deep Learning", group: 1, definition: "Machine learning using neural networks with many hidden layers" },
            { term: "Backpropagation", group: 2, definition: "The algorithm used to calculate gradients and update weights to minimize error" },
            { term: "MNIST", group: 2, definition: "A classic dataset of handwritten digits used to train and test image recognition systems" }
        ],
            interactive_timeline: [
                { timestamp: 0, label: "The Goal", deep_dive: "The goal is to build a system that can recognize handwritten digits (0-9) from a grid of pixels." },
                { timestamp: 120, label: "Structure of the Network", deep_dive: "The network has an input layer (784 neurons for pixels), hidden layers, and an output layer (10 neurons)." },
                { timestamp: 300, label: "Weights & Biases", deep_dive: "Weights determine pixel importance; biases set the activation threshold." },
                { timestamp: 540, label: "The Sigmoid Function", deep_dive: "Sigmoid maps any number to a value between 0 and 1, representing the 'confidence' of activation." },
                { timestamp: 750, label: "Matrix Notation", deep_dive: "The entire layer operation can be written as a single matrix multiplication: a(L) = σ(Wa(L-1) + b)." },
                { timestamp: 960, label: "What is it Learning?", deep_dive: "The network isn't memorizing shapes; it's learning to decompose inputs into smaller features like edges and loops." }
            ],
                quiz_bank: [
                    {
                        question: "What is the purpose of an activation function?",
                        options: ["To store data", "To determine the output of a neuron", "To delete the neuron", "To add noise"],
                        answer: 1,
                        distractor_explanation: "The activation function (like Sigmoid) decides the output level of the neuron based on its weighted input."
                    },
                    {
                        question: "What does a bias do?",
                        options: ["Identifies the neuron", "Shifts the activation threshold", "Multiplies the input", "Resets the network"],
                        answer: 1,
                        distractor_explanation: "A bias shifts the activation curve, effectively controlling the threshold at which the neuron fires."
                    },
                    {
                        question: "In the example, what does a neuron in the first hidden layer represent?",
                        options: ["A full number", "A specific pixel", "Abstract patterns or edges", "The final answer"],
                        answer: 2,
                        distractor_explanation: "Hidden neurons often learn to recognize substructures like edges or small curves."
                    }
                ],
                    the_gravity_shift: "Think of a neural network like a plinko board where the pegs (weights) move. You drop a ball (input), and if it lands in the wrong bin, you nudge the pegs slightly so next time it lands in the right one!"
},

// The Egg: https://youtu.be/h6fcK_fRYaI
"h6fcK_fRYaI": {
    summary: "The Egg is a short story by Andy Weir about a man who dies and meets God. God reveals that the man will be reincarnated as every human who has ever lived and will ever live. The entire universe was created as an egg for the main character to mature until they have lived every human life and can become a god themselves.",
        knowledge_graph: [
            { term: "Reincarnation", group: 1, definition: "The concept of being born again in a new body after death" },
            { term: "The Egg", group: 1, definition: "Metaphor for the universe serving as an incubator for a developing god-consciousness" },
            { term: "Main Character", group: 1, definition: "The protagonist who discovers they are everyone who has ever lived" },
            { term: "God", group: 2, definition: "The entity guiding the protagonist, representing a mature version of the same species" },
            { term: "Time", group: 2, definition: "Explained as a flexible construct; reincarnation can happen at any point in history" },
            { term: "Solipsism", group: 2, definition: "The philosophical idea that only one's own mind is sure to exist (taken to the extreme here)" },
            { term: "Empathy", group: 2, definition: "The ultimate lesson of the story — hurting others is hurting oneself" }
        ],
            interactive_timeline: [
                { timestamp: 0, label: "The Afterlife", deep_dive: "The protagonist dies in a car crash and meets a being in a void." },
                { timestamp: 120, label: "Reincarnation Revealed", deep_dive: "He learns he will be reincarnated as a Chinese peasant girl in 540 AD." },
                { timestamp: 240, label: "Time is Nonlinear", deep_dive: "Time doesn't flow linearly for the soul; he can be born in the past or future." },
                { timestamp: 360, label: "You Are Everyone", deep_dive: "The shocking revelation: he is Abraham Lincoln, John Wilkes Booth, and even Jesus." },
                { timestamp: 420, label: "The Purpose and Meaning", deep_dive: "The universe exists to help him grow by experiencing all human lives." },
                { timestamp: 460, label: "Hatching", deep_dive: "Once he has lived every life, he will be ready to be born as a godlike being." }
            ],
                quiz_bank: [
                    {
                        question: "Who is the main character reincarnated as?",
                        options: ["Only good people", "Only famous people", "Every human being who ever lived", "Animals"],
                        answer: 2,
                        distractor_explanation: "The story reveals he is, in fact, every human being throughout all of history."
                    },
                    {
                        question: "Why was the universe created according to the story?",
                        options: ["As a punishment", "As an egg for the protagonist to grow", "It was an accident", "To trap souls"],
                        answer: 1,
                        distractor_explanation: "The universe is described as an egg, an incubator for the protagonist's soul to mature."
                    },
                    {
                        question: "What happens when 'you' hurt someone?",
                        options: ["You gain karma", "You hurt yourself", "Nothing happens", "God gets angry"],
                        answer: 1,
                        distractor_explanation: "Since you are everyone, every act of violence is self-inflicted."
                    }
                ],
                    the_gravity_shift: "Imagine playing a multiplayer video game, but realizing you are actually controlling every single character on the server, just taking turns one life at a time. That's The Egg."
},

// Quantum Computers: https://youtu.be/JhHMJCUmq28
"JhHMJCUmq28": {
    summary: "Quantum computers use the principles of quantum mechanics — specifically superposition and entanglement — to solve certain complex problems exponentially faster than classical computers. While classical bits are 0 or 1, Qubits can be in a state of superposition (both 0 and 1) until measured.",
        knowledge_graph: [
            { term: "Qubit", group: 1, definition: "The basic unit of quantum information, capable of existing in superposition" },
            { term: "Superposition", group: 1, definition: "A state where a qubit represents both 0 and 1 simultaneously with certain probabilities" },
            { term: "Entanglement", group: 1, definition: "A phenomenon where qubits become linked; measuring one instantly determines the state of the other" },
            { term: "Classical Computer", group: 2, definition: "Computers using bits (0/1) and logic gates — effective for most tasks but limited for simulation" },
            { term: "Quantum Gate", group: 2, definition: "Operations that change the state of qubits (like rotation), analogous to logic gates" },
            { term: "Exponential Speedup", group: 2, definition: "The ability to check 2^n states at once, making some unsolvable problems solvable" },
            { term: "Database Search", group: 2, definition: "Quantum computers can search unsorted databases in square root time (Grover's algorithm)" },
            { term: "Encryption", group: 2, definition: "Quantum computers could break current security (RSA) by factoring large numbers (Shor's algorithm)" }
        ],
            interactive_timeline: [
                { timestamp: 0, label: "Bits vs Qubits", deep_dive: "A classical bit is a switch (on/off). A qubit is like a spinning coin (heads/tails/in-between)." },
                { timestamp: 120, label: "Superposition", deep_dive: "Before you look, the qubit is in a mixed probability state. Measurement forces it to collapse." },
                { timestamp: 240, label: "Entanglement", deep_dive: "Einstein called this 'spooky action at a distance'. It allows instant correlation between qubits." },
                { timestamp: 360, label: "Quantum Parallelism", deep_dive: "With 4 bits, you have 1 of 16 states. With 4 qubits, you can manipulate all 16 states at once." },
                { timestamp: 480, label: "What are they good for?", deep_dive: "They aren't faster at everything — just specific tasks like database searching and molecular simulation." },
                { timestamp: 600, label: "Encryption Threat", deep_dive: "Current internet security relies on the difficulty of factoring primes; quantum computers could solve this easily." }
            ],
                quiz_bank: [
                    {
                        question: "What is the fundamental unit of a quantum computer?",
                        options: ["Byte", "Bit", "Qubit", "Pixel"],
                        answer: 2,
                        distractor_explanation: "A Qubit (Quantum Bit) is the basic unit, capable of superposition."
                    },
                    {
                        question: "What is Superposition?",
                        options: ["Can be 0 and 1 at the same time", "Being in two places", "Moving faster than light", "Zero gravity"],
                        answer: 0,
                        distractor_explanation: "Superposition allows a qubit to exist in a probability state of both 0 and 1."
                    },
                    {
                        question: "Are quantum computers faster at everything?",
                        options: ["Yes, much faster", "No, only specific types of problems", "They are slower", "Same speed"],
                        answer: 1,
                        distractor_explanation: "They are only faster for specific algorithms (like factoring or search), not general browsing or gaming."
                    }
                ],
                    the_gravity_shift: "A classical computer solves a maze by trying one path, hitting a wall, and starting over. A quantum computer tries EVERY path simultaneously and instantly reveals the exit."
}
};

module.exports = MOCK_DATA;
