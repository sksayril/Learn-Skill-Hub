import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    const notice = await db.collection("settings").findOne({ type: "notice" });
    
    if (!notice) {
      // Return a default inactive notice if none exists in the DB yet
      return NextResponse.json({
        success: true,
        data: {
          title: "Important Notice",
          content: "Welcome to Support Mission India. Training batch registrations are open.",
          active: false
        }
      });
    }
    
    return NextResponse.json({ success: true, data: notice });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, active } = body;
    
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    await db.collection("settings").updateOne(
      { type: "notice" },
      { 
        $set: { 
          title: title || "Important Notice",
          content: content || "",
          active: active === true || active === "true",
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
