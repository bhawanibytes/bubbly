## Enter Number Send Message

- create dm chat controller + API + Types => done
- send dm message controller + API + Types => done
- fetch all/few chat of one user + API + Types + frontend handling => halfBaked
- fetch all/few message of one chat in time sorted format + API + Types + frontend handling => halfBaked
- message dashboard

####Imp Queries

db.select().from(users).limit(10);
db.query.users.findMany({
  where: eq(users.id, "2606a36d-4733-4bf7-bcb0-3793a536a91f"),
  with: {
    chatMembers: {
      orderBy: (chatMembers, { desc }) => [desc(chatMembers.joinedAt)],
    },
    messages: {
      orderBy: (messages, { desc }) => [desc(messages.createdAt)],
    },
  },
});
db.query.chats.findMany({
  where: inArray(chats.id, ["921465b0-21e4-4a57-b0f2-8f19d3eee3e9", "0c6ac488-ff43-4cc8-8ef2-81ef793e2a98"]),
  with: {
    messages: {
      orderBy: (messages, { desc }) => [desc(messages.createdAt)],
    },
  },
  orderBy: (chats, {desc}) => [desc(chats.lastMessageTimestamp)]
});