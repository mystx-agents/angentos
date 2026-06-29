from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.connection import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_vip = Column(Boolean, default=False)
    role = Column(String, default="user") # user, admin
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    conversations = relationship("Conversation", back_populates="user")
    memories = relationship("Memory", back_populates="user")
    analytics = relationship("Analytics", back_populates="user", uselist=False)
    relationship_score = relationship("Relationship", back_populates="user", uselist=False)

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender_role = Column(String) # user, agent
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    conversation = relationship("Conversation", back_populates="messages")

class Memory(Base):
    __tablename__ = "ai_memory"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    summary = Column(Text)
    importance = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="memories")

class Relationship(Base):
    __tablename__ = "relationship"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    score = Column(Float, default=0.5)
    notes = Column(Text)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="relationship_score")

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    funny_pct = Column(Float, default=0.0)
    casual_pct = Column(Float, default=0.0)
    emotional_pct = Column(Float, default=0.0)
    professional_pct = Column(Float, default=0.0)
    avg_reply_time_ms = Column(Float, default=0.0)
    total_messages = Column(Integer, default=0)
    
    user = relationship("User", back_populates="analytics")

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    report_type = Column(String) # daily, weekly, monthly
    content = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SettingsModel(Base):
    __tablename__ = "settings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    preferences = Column(JSON)

class Log(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    level = Column(String)
    message = Column(Text)
    details = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VIPUser(Base):
    __tablename__ = "vip_users"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    perks = Column(JSON)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
