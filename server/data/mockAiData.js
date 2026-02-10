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
};

module.exports = MOCK_DATA;
