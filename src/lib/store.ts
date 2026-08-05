import { v4 as uuid } from "uuid";
import type {
  Agent,
  Channel,
  Contact,
  Conversation,
  ConversationStatus,
  CoverageType,
  DbShape,
  Lead,
  LeadStage,
  Message,
  MessageRole,
  Policy,
  SmsLog,
  Task,
} from "./types";

const g = globalThis as unknown as { __spyCrmDb?: DbShape };

function now() {
  return new Date().toISOString();
}

function seed(): DbShape {
  const agent: Agent = {
    id: "agent_ryan",
    name: "Ryan Rodenbeck",
    email: "ryan@spyglassrealty.com",
    role: "admin",
  };
  const agent2: Agent = {
    id: "agent_maya",
    name: "Maya Hermes",
    email: "maya@spyglassrealty.com",
    role: "csr",
  };

  const c1: Contact = {
    id: "ct_1",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@example.com",
    phone: "+15125550101",
    city: "Austin",
    zip: "78704",
    tags: ["homeowner", "web"],
    createdAt: now(),
    updatedAt: now(),
  };
  const c2: Contact = {
    id: "ct_2",
    firstName: "Sam",
    lastName: "Patel",
    email: "sam.patel@example.com",
    phone: "+15125550102",
    city: "Round Rock",
    zip: "78664",
    tags: ["renter"],
    createdAt: now(),
    updatedAt: now(),
  };
  const c3: Contact = {
    id: "ct_3",
    firstName: "Alex",
    lastName: "Nguyen",
    email: "alex.n@example.com",
    phone: "+15125550103",
    city: "Austin",
    zip: "78759",
    tags: ["producer-referral", "e&o"],
    createdAt: now(),
    updatedAt: now(),
  };

  const leads: Lead[] = [
    {
      id: "ld_1",
      contactId: c1.id,
      stage: "quoted",
      coverageInterest: "property_casualty",
      source: "website_form",
      score: 82,
      assignedTo: agent.id,
      notes: "Buying in Travis Heights; needs HO-3 quote.",
      valueEstimate: 2400,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "ld_2",
      contactId: c2.id,
      stage: "new",
      coverageInterest: "renters",
      source: "web_chat",
      score: 61,
      notes: "Landlord requires proof by Friday.",
      valueEstimate: 220,
      createdAt: now(),
      updatedAt: now(),
    },
    {
      id: "ld_3",
      contactId: c3.id,
      stage: "qualified",
      coverageInterest: "professional_liability",
      source: "spyglass_realty_referral",
      score: 90,
      assignedTo: agent.id,
      notes: "Real estate agent E&O; team of 4.",
      valueEstimate: 1800,
      createdAt: now(),
      updatedAt: now(),
    },
  ];

  const policies: Policy[] = [
    {
      id: "pol_1",
      contactId: c1.id,
      leadId: "ld_1",
      type: "property_casualty",
      carrier: "Demo Mutual",
      policyNumber: "PC-100284",
      premiumMonthly: 186,
      effectiveDate: "2026-06-01",
      renewalDate: "2027-06-01",
      status: "pending",
      createdAt: now(),
    },
  ];

  const conv1: Conversation = {
    id: "cv_1",
    contactId: c2.id,
    leadId: "ld_2",
    channel: "web_chat",
    status: "ai",
    subject: "Renters insurance question",
    visitorId: "vis_demo_2",
    lastMessageAt: now(),
    unread: 1,
    aiEnabled: true,
    createdAt: now(),
  };
  const conv2: Conversation = {
    id: "cv_2",
    contactId: c3.id,
    leadId: "ld_3",
    channel: "sms",
    status: "human",
    subject: "E&O SMS thread",
    phone: c3.phone,
    lastMessageAt: now(),
    unread: 0,
    aiEnabled: false,
    createdAt: now(),
  };

  const messages: Message[] = [
    {
      id: "msg_1",
      conversationId: conv1.id,
      role: "lead",
      channel: "web_chat",
      body: "I need renters insurance for my apartment ASAP.",
      createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      id: "msg_2",
      conversationId: conv1.id,
      role: "ai",
      channel: "web_chat",
      body: "I can help with renters coverage. What’s your ZIP and move-in date?",
      createdAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
    },
    {
      id: "msg_3",
      conversationId: conv1.id,
      role: "lead",
      channel: "web_chat",
      body: "78704, need certificate by Friday for the landlord.",
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: "msg_4",
      conversationId: conv2.id,
      role: "lead",
      channel: "sms",
      body: "Can you send E&O options for a 4-person team?",
      createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      id: "msg_5",
      conversationId: conv2.id,
      role: "agent",
      channel: "sms",
      body: "Absolutely — I’ll text two carrier options this afternoon.",
      agentName: "Ryan Rodenbeck",
      createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    },
  ];

  const tasks: Task[] = [
    {
      id: "tk_1",
      contactId: c2.id,
      leadId: "ld_2",
      title: "Send renters proof of insurance",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      done: false,
      type: "followup",
      createdAt: now(),
    },
    {
      id: "tk_2",
      contactId: c1.id,
      leadId: "ld_1",
      title: "Follow up on HO-3 quote",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
      done: false,
      type: "call",
      createdAt: now(),
    },
    {
      id: "tk_3",
      contactId: c1.id,
      title: "Renewal reminder — PC-100284",
      dueAt: "2027-05-01T15:00:00.000Z",
      done: false,
      type: "renewal",
      createdAt: now(),
    },
  ];

  return {
    contacts: [c1, c2, c3],
    leads,
    policies,
    conversations: [conv1, conv2],
    messages,
    tasks,
    agents: [agent, agent2],
    smsLogs: [],
  };
}

export function db(): DbShape {
  if (!g.__spyCrmDb) g.__spyCrmDb = seed();
  return g.__spyCrmDb;
}

export function resetDb() {
  g.__spyCrmDb = seed();
  return g.__spyCrmDb;
}

export function getContact(id: string) {
  return db().contacts.find((c) => c.id === id);
}

export function getLead(id: string) {
  return db().leads.find((l) => l.id === id);
}

export function coverageLabel(t: CoverageType) {
  const map: Record<CoverageType, string> = {
    property_casualty: "Property & Casualty",
    professional_liability: "Professional Liability / E&O",
    renters: "Renters",
    supplemental: "Supplemental",
    multiple: "Multiple",
    unknown: "Unknown",
  };
  return map[t];
}

export function stageLabel(s: LeadStage) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Simple AI reply engine for web chat / SMS auto-pilot */
export function aiReply(text: string): string {
  const t = text.toLowerCase();
  if (/renter/.test(t)) {
    return "Renters insurance protects belongings and liability — often required by landlords. What’s your ZIP and when do you need proof of insurance?";
  }
  if (/p&c|property|casualty|homeowner|home|ho-?3/.test(t)) {
    return "Property & casualty covers the home, personal property, and liability. Is this a primary home or investment property?";
  }
  if (/professional|e&o|liability|errors/.test(t)) {
    return "Professional liability (E&O) helps when clients claim a mistake in advice or services. Solo producer or a team?";
  }
  if (/supplement/.test(t)) {
    return "Supplemental coverage fills gaps beyond a primary policy. What coverage do you already have?";
  }
  if (/quote|price|cost|how much/.test(t)) {
    return "I can start a free consultation. Share your name, phone, ZIP, and coverage type — or an agent can take over this chat.";
  }
  if (/human|agent|person|take over|representative/.test(t)) {
    return "Connecting you with a Spyglass Insurance agent. Someone will continue this conversation shortly.";
  }
  return "Thanks — I’ve noted that. I can help with P&C, professional liability, renters, or supplemental coverage. Ask for an agent anytime to take over.";
}

export function upsertLeadFromForm(input: {
  name: string;
  email: string;
  phone: string;
  interest: string;
  location?: string;
  message?: string;
  source?: string;
}) {
  const data = db();
  const parts = input.name.trim().split(/\s+/);
  const firstName = parts[0] || "Friend";
  const lastName = parts.slice(1).join(" ") || "";
  const interestMap: Record<string, CoverageType> = {
    "Property & Casualty": "property_casualty",
    "Professional Liability / E&O": "professional_liability",
    "Renters Insurance": "renters",
    "Supplemental Coverage": "supplemental",
    "Multiple / not sure": "multiple",
  };
  const coverageInterest = interestMap[input.interest] || "unknown";

  let contact = data.contacts.find(
    (c) =>
      c.email.toLowerCase() === input.email.toLowerCase() ||
      c.phone.replace(/\D/g, "") === input.phone.replace(/\D/g, "")
  );
  if (!contact) {
    contact = {
      id: uuid(),
      firstName,
      lastName,
      email: input.email,
      phone: input.phone,
      city: input.location,
      tags: ["website"],
      createdAt: now(),
      updatedAt: now(),
    };
    data.contacts.unshift(contact);
  } else {
    contact.updatedAt = now();
    if (input.location) contact.city = input.location;
  }

  const lead: Lead = {
    id: uuid(),
    contactId: contact.id,
    stage: "new",
    coverageInterest,
    source: input.source || "website_form",
    score: coverageInterest === "professional_liability" ? 85 : 70,
    notes: input.message || "",
    createdAt: now(),
    updatedAt: now(),
  };
  data.leads.unshift(lead);

  const task: Task = {
    id: uuid(),
    contactId: contact.id,
    leadId: lead.id,
    title: `New lead: ${coverageLabel(coverageInterest)}`,
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    done: false,
    type: "followup",
    createdAt: now(),
  };
  data.tasks.unshift(task);

  return { contact, lead, task };
}

export function createOrGetWebConversation(visitorId: string, meta?: { name?: string; email?: string; phone?: string }) {
  const data = db();
  let conv = data.conversations.find(
    (c) => c.visitorId === visitorId && c.channel === "web_chat" && c.status !== "closed"
  );
  if (!conv) {
    conv = {
      id: uuid(),
      channel: "web_chat",
      status: "ai",
      subject: "Website chat",
      visitorId,
      email: meta?.email,
      phone: meta?.phone,
      lastMessageAt: now(),
      unread: 0,
      aiEnabled: true,
      createdAt: now(),
    };
    data.conversations.unshift(conv);
  }
  return conv;
}

export function appendMessage(input: {
  conversationId: string;
  role: MessageRole;
  channel: Channel;
  body: string;
  agentName?: string;
}) {
  const data = db();
  const conv = data.conversations.find((c) => c.id === input.conversationId);
  if (!conv) throw new Error("Conversation not found");
  const msg: Message = {
    id: uuid(),
    conversationId: input.conversationId,
    role: input.role,
    channel: input.channel,
    body: input.body,
    createdAt: now(),
    agentName: input.agentName,
  };
  data.messages.push(msg);
  conv.lastMessageAt = msg.createdAt;
  if (input.role === "lead") conv.unread += 1;
  return msg;
}

export function setConversationMode(id: string, status: ConversationStatus, aiEnabled?: boolean) {
  const conv = db().conversations.find((c) => c.id === id);
  if (!conv) throw new Error("Conversation not found");
  conv.status = status;
  if (typeof aiEnabled === "boolean") conv.aiEnabled = aiEnabled;
  if (status === "human") conv.aiEnabled = false;
  if (status === "ai") conv.aiEnabled = true;
  return conv;
}

export function updateLeadStage(id: string, stage: LeadStage) {
  const lead = db().leads.find((l) => l.id === id);
  if (!lead) throw new Error("Lead not found");
  lead.stage = stage;
  lead.updatedAt = now();
  return lead;
}

export function logSms(entry: Omit<SmsLog, "id" | "createdAt">) {
  const row: SmsLog = { ...entry, id: uuid(), createdAt: now() };
  db().smsLogs.unshift(row);
  return row;
}

export function findOrCreateSmsConversation(phone: string, contactId?: string) {
  const data = db();
  let conv = data.conversations.find(
    (c) => c.channel === "sms" && c.phone === phone && c.status !== "closed"
  );
  if (!conv) {
    conv = {
      id: uuid(),
      contactId,
      channel: "sms",
      status: "ai",
      subject: `SMS ${phone}`,
      phone,
      lastMessageAt: now(),
      unread: 0,
      aiEnabled: true,
      createdAt: now(),
    };
    data.conversations.unshift(conv);
  }
  return conv;
}

export function dashboardStats() {
  const data = db();
  const openLeads = data.leads.filter((l) => !["bound", "lost"].includes(l.stage)).length;
  const openConvos = data.conversations.filter((c) => c.status !== "closed").length;
  const needsHuman = data.conversations.filter((c) => c.status === "human" || c.unread > 0).length;
  const tasksDue = data.tasks.filter((t) => !t.done).length;
  const pipelineValue = data.leads
    .filter((l) => !["lost", "bound"].includes(l.stage))
    .reduce((s, l) => s + (l.valueEstimate || 0), 0);
  return { openLeads, openConvos, needsHuman, tasksDue, pipelineValue, policies: data.policies.length };
}
