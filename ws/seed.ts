import { db } from "@db/db" // adjust path to your db instance
import { users } from "@schema/users"
import { chats } from "@schema/chats"
import { chatMembers } from "@schema/chatMembers"
import { messages } from "@schema/messages"
import { messageStatus } from "@schema/messageStatus"
import { eq } from "drizzle-orm"

// Helper function to generate random timestamps
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Sample data generators
const generateUsers = () => {
  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Eve Adams",
    "Frank Miller",
    "Grace Lee",
    "Henry Davis",
    "Iris West",
    "Jack Ryan"
  ]

  return names.map((name, idx) => ({
    name,
    phoneNumber: `+1555${String(idx).padStart(7, "0")}`,
    pin: `${1000 + idx}`,
    profilePicture: `https://i.pravatar.cc/150?img=${idx + 1}`,
    lastSeen: randomDate(new Date(2024, 0, 1), new Date()),
    isVerified: idx % 3 !== 0, // Some unverified users
    verifiedAt: idx % 3 !== 0 ? randomDate(new Date(2023, 0, 1), new Date()) : null,
  }))
}

const sampleMessages = [
  "Hey! How are you doing?",
  "Did you see the game last night?",
  "Let's catch up this weekend!",
  "I'll send you the documents",
  "Thanks for your help!",
  "What time works for you?",
  "That sounds great!",
  "I'm running a bit late",
  "See you soon!",
  "Perfect, let me know",
  "Can you call me?",
  "I just sent it over",
  "Looking forward to it!",
  "Got it, thanks!",
  "No worries at all"
]

async function seed() {
  console.log("🌱 Starting database seed...")

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log("Clearing existing data...")
    await db.delete(messageStatus)
    await db.delete(messages)
    await db.delete(chatMembers)
    await db.delete(chats)
    await db.delete(users)

    // 1. Create Users
    console.log("Creating users...")
    const userRecords = generateUsers()
    const insertedUsers = await db.insert(users).values(userRecords).returning()
    console.log(`✓ Created ${insertedUsers.length} users`)

    // 2. Create Direct Chats (1-on-1)
    console.log("Creating direct chats...")
    const directChats = []
    for (let i = 0; i < insertedUsers.length - 1; i += 2) {
      directChats.push({
        isGroup: false,
        groupName: null, // Direct chats don't have group names
        createdBy: insertedUsers[i].id,
        createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      })
    }
    const insertedDirectChats = await db.insert(chats).values(directChats).returning()
    console.log(`✓ Created ${insertedDirectChats.length} direct chats`)

    // 3. Create Group Chats
    console.log("Creating group chats...")
    const groupChats = [
      {
        isGroup: true,
        groupName: "Team Alpha",
        groupPicture: "https://i.pravatar.cc/150?img=50",
        createdBy: insertedUsers[0].id,
        createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      },
      {
        isGroup: true,
        groupName: "Project Discussion",
        groupPicture: "https://i.pravatar.cc/150?img=51",
        createdBy: insertedUsers[1].id,
        createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      },
      {
        isGroup: true,
        groupName: "Weekend Plans",
        groupPicture: "https://i.pravatar.cc/150?img=52",
        createdBy: insertedUsers[2].id,
        createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      },
    ]
    const insertedGroupChats = await db.insert(chats).values(groupChats).returning()
    console.log(`✓ Created ${insertedGroupChats.length} group chats`)

    const allChats = [...insertedDirectChats, ...insertedGroupChats]

    // 4. Create Chat Members
    console.log("Creating chat members...")
    const chatMemberRecords = []

    // Add members to direct chats
    insertedDirectChats.forEach((chat, idx) => {
      const baseIdx = idx * 2
      chatMemberRecords.push(
        {
          chatId: chat.id,
          userId: insertedUsers[baseIdx].id,
          role: "member",
          joinedAt: chat.createdAt,
        },
        {
          chatId: chat.id,
          userId: insertedUsers[baseIdx + 1].id,
          role: "member",
          joinedAt: chat.createdAt,
        }
      )
    })

    // Add members to group chats
    insertedGroupChats.forEach((chat, idx) => {
      const memberCount = 3 + Math.floor(Math.random() * 4) // 3-6 members
      const startIdx = idx * 2
      
      for (let i = 0; i < memberCount && startIdx + i < insertedUsers.length; i++) {
        chatMemberRecords.push({
          chatId: chat.id,
          userId: insertedUsers[startIdx + i].id,
          role: i === 0 ? "admin" : "member",
          joinedAt: randomDate(chat.createdAt!, new Date()),
        })
      }
    })

    await db.insert(chatMembers).values(chatMemberRecords)
    console.log(`✓ Created ${chatMemberRecords.length} chat memberships`)

    // 5. Create Messages
    console.log("Creating messages...")
    const messageRecords = []
    const messageTypes = ["text", "image", "video", "voice", "doc"] as const

    for (const chat of allChats) {
      // Get members of this chat
      const members = chatMemberRecords.filter(cm => cm.chatId === chat.id)
      const messageCount = 5 + Math.floor(Math.random() * 15) // 5-20 messages per chat

      for (let i = 0; i < messageCount; i++) {
        const randomMember = members[Math.floor(Math.random() * members.length)]
        const msgType = i % 8 === 0 ? messageTypes[Math.floor(Math.random() * messageTypes.length)] : "text"
        
        let content = sampleMessages[Math.floor(Math.random() * sampleMessages.length)]
        
        // Adjust content based on type
        if (msgType === "image") content = "https://picsum.photos/400/300"
        else if (msgType === "video") content = "video_file_url.mp4"
        else if (msgType === "voice") content = "voice_note_url.mp3"
        else if (msgType === "doc") content = "document_file_url.pdf"

        messageRecords.push({
          chatId: chat.id,
          senderId: randomMember.userId,
          content,
          messageType: msgType,
          createdAt: randomDate(chat.createdAt!, new Date()),
          replyTo: null, // Can be enhanced to reference previous messages
        })
      }
    }

    // Sort messages by timestamp for realistic conversation flow
    messageRecords.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime())

    const insertedMessages = await db.insert(messages).values(messageRecords).returning()
    console.log(`✓ Created ${insertedMessages.length} messages`)

    // 6. Update chats with last message info
    console.log("Updating chats with last messages...")
    for (const chat of allChats) {
      const chatMessages = insertedMessages.filter(m => m.chatId === chat.id)
      if (chatMessages.length > 0) {
        const lastMsg = chatMessages[chatMessages.length - 1]
        await db.update(chats)
          .set({
            lastMessageId: lastMsg.id,
            lastMessageContent: lastMsg.content.substring(0, 100),
            lastMessageTimestamp: lastMsg.createdAt,
            lastMessageSender: lastMsg.senderId,
          })
          .where(eq(chats.id, chat.id))
      }
    }
    console.log("✓ Updated chats with last message info")

    // 7. Create Message Status records
    console.log("Creating message status records...")
    const messageStatusRecords = []

    for (const msg of insertedMessages) {
      // Get all members of the chat except the sender
      const chatMembs = chatMemberRecords.filter(cm => 
        cm.chatId === msg.chatId && cm.userId !== msg.senderId
      )

      for (const member of chatMembs) {
        const statuses = ["not-delivered", "delivered", "read"] as const
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        
        let deliveredAt = null
        let readAt = null

        if (randomStatus === "delivered" || randomStatus === "read") {
          deliveredAt = randomDate(msg.createdAt!, new Date())
        }
        
        if (randomStatus === "read") {
          readAt = randomDate(deliveredAt || msg.createdAt!, new Date())
        }

        messageStatusRecords.push({
          messageId: msg.id,
          userId: member.userId,
          status: randomStatus,
          deliveredAt,
          readAt,
        })
      }
    }

    await db.insert(messageStatus).values(messageStatusRecords)
    console.log(`✓ Created ${messageStatusRecords.length} message status records`)

    console.log("🎉 Database seeded successfully!")
    console.log("\nSummary:")
    console.log(`- Users: ${insertedUsers.length}`)
    console.log(`- Chats: ${allChats.length} (${insertedDirectChats.length} direct, ${insertedGroupChats.length} groups)`)
    console.log(`- Chat Members: ${chatMemberRecords.length}`)
    console.log(`- Messages: ${insertedMessages.length}`)
    console.log(`- Message Statuses: ${messageStatusRecords.length}`)

  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("Seed completed!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exit(1)
  })