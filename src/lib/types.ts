export type LeadStage =
  | "new"
  | "contacted"
  | "qualified"
  | "quoted"
  | "bound"
  | "lost";

export type CoverageType =
  | "property_casualty"
  | "professional_liability"
  | "renters"
  | "supplemental"
  | "multiple"
  | "unknown";

export type Channel = "web_chat" | "sms" | "email" | "phone" | "form";

export type MessageRole = "lead" | "ai" | "agent" | "system";

export type ConversationStatus = "ai" | "human" | "closed";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  zip?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  contactId: string;
  stage: LeadStage;
  coverageInterest: CoverageType;
  source: string;
  score: number;
  assignedTo?: string;
  notes: string;
  valueEstimate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Policy {
  id: string;
  contactId: string;
  leadId?: string;
  type: CoverageType;
  carrier: string;
  policyNumber: string;
  premiumMonthly: number;
  effectiveDate: string;
  renewalDate: string;
  status: "active" | "pending" | "cancelled" | "expired";
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  channel: Channel;
  body: string;
  createdAt: string;
  agentName?: string;
}

export interface Conversation {
  id: string;
  contactId?: string;
  leadId?: string;
  channel: Channel;
  status: ConversationStatus;
  subject: string;
  phone?: string;
  email?: string;
  visitorId?: string;
  lastMessageAt: string;
  unread: number;
  aiEnabled: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  contactId?: string;
  leadId?: string;
  title: string;
  dueAt: string;
  done: boolean;
  type: "call" | "sms" | "email" | "renewal" | "followup";
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: "producer" | "csr" | "admin";
}

export interface SmsLog {
  id: string;
  conversationId?: string;
  contactId?: string;
  direction: "inbound" | "outbound";
  from: string;
  to: string;
  body: string;
  status: "queued" | "sent" | "delivered" | "failed" | "received";
  provider: "twilio" | "demo";
  createdAt: string;
}

export interface DbShape {
  contacts: Contact[];
  leads: Lead[];
  policies: Policy[];
  conversations: Conversation[];
  messages: Message[];
  tasks: Task[];
  agents: Agent[];
  smsLogs: SmsLog[];
}
