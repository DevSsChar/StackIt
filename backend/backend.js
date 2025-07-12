/*
   IMP: npm i framer-motion next-auth mongoose bcryptjs cors dotenv

   Admin role:
   can check questions
   can check answers
   can check users
   can check tags
   can delete questions
 
   User:
   can ask questions
   can answer questions
   can comment on questions
   can upvote questions
   can downvote questions

   Questions:
    - title
    - description
    - tags
    - author
    - upvotes
    - downvotes
    - answers
    - comments

    Answers:
    - description
    - author
    - upvotes
    - downvotes
    - question

    Comments:
    - description
    - author
    - question
    - answer

    Tags:
    - name
    - description
    - questions

    search by tags
    search by questions
    search by users
    search by answers(optional)
    search by comments(optional)
    display most upvoted answers in the /leaderboard page
    display most upvoted questions in the /leaderboard page
    display most upvoted users in the /leaderboard page


*/