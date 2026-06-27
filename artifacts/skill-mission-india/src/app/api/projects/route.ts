import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const defaultProjects = [
  {
    icon: "Droplet",
    title: "BKSY (Banglar Krishi Sech Yojana)",
    subtitle: "Bengal Agricultural Irrigation Scheme",
    category: "Agriculture",
    image: "/images/project_bksy.jpg",
    gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
    accent: "#00C2FF",
    accentBg: "bg-blue-500/20",
    accentText: "text-blue-300",
    accentBorder: "border-blue-400/40",
    benefits: ["Micro-irrigation installation", "Solar water pump subsidy", "Water conservation guidelines"],
    stats: "1,200+ Pumps Distributed",
    updatedAt: new Date()
  },
  {
    icon: "Leaf",
    title: "Matir Kotha",
    subtitle: "Farmer Advisory & Soil Portal",
    category: "Agriculture",
    image: "/images/project_matirkotha.jpg",
    gradient: "from-emerald-900/90 via-emerald-800/70 to-transparent",
    accent: "#10B981",
    accentBg: "bg-emerald-500/20",
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400/40",
    benefits: ["Soil health card generation", "Live meteorological advisories", "Agricultural toll-free support"],
    stats: "25k+ Soil Tests Completed",
    updatedAt: new Date()
  },
  {
    icon: "Zap",
    title: "Alosree Project",
    subtitle: "Solar & LED Street Lighting Initiative",
    category: "Infrastructure & Tech",
    image: "/images/project_alosree.jpg",
    gradient: "from-amber-900/90 via-amber-800/70 to-transparent",
    accent: "#F59E0B",
    accentBg: "bg-amber-500/20",
    accentText: "text-amber-300",
    accentBorder: "border-amber-400/40",
    benefits: ["Energy efficiency mapping", "Solar panels configuration", "LED institutional upgrades"],
    stats: "10k+ Solar Street Lights",
    updatedAt: new Date()
  },
  {
    icon: "GraduationCap",
    title: "Skill Training",
    subtitle: "National Vocational Certifications",
    category: "Education",
    image: "/images/project_skill.jpg",
    gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent",
    accent: "#06B6D4",
    accentBg: "bg-cyan-500/20",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-400/40",
    benefits: ["Free computing curricula", "Tally & office administration", "Interview placement support"],
    stats: "15k+ Certified Trainees",
    updatedAt: new Date()
  },
  {
    icon: "School",
    title: "School Project",
    subtitle: "Smart Digital Classrooms",
    category: "Education",
    image: "/images/project_school.jpg",
    gradient: "from-purple-900/90 via-purple-800/70 to-transparent",
    accent: "#A78BFA",
    accentBg: "bg-purple-500/20",
    accentText: "text-purple-300",
    accentBorder: "border-purple-400/40",
    benefits: ["Interactive board installations", "Digital computer labs", "Teacher technology courses"],
    stats: "45+ Rural Schools Covered",
    updatedAt: new Date()
  },
  {
    icon: "Cpu",
    title: "Digitization Project",
    subtitle: "E-Governance Records Digitalization",
    category: "Infrastructure & Tech",
    image: "/images/project_digitization.jpg",
    gradient: "from-indigo-900/90 via-indigo-800/70 to-transparent",
    accent: "#6366F1",
    accentBg: "bg-indigo-500/20",
    accentText: "text-indigo-300",
    accentBorder: "border-indigo-400/40",
    benefits: ["Secure database transition", "Rapid retrieval database design", "E-Governance system audits"],
    stats: "200k+ Documents Cataloged",
    updatedAt: new Date()
  },
  {
    icon: "Activity",
    title: "Free Health Camp",
    subtitle: "Rural Diagnostics & Checkups",
    category: "Healthcare & Hygiene",
    image: "/images/project_healthcamp.jpg",
    gradient: "from-rose-900/90 via-rose-800/70 to-transparent",
    accent: "#F43F5E",
    accentBg: "bg-rose-500/20",
    accentText: "text-rose-300",
    accentBorder: "border-rose-400/40",
    benefits: ["Free diagnostics & advice", "Free medicine handouts", "Sanitation awareness sessions"],
    stats: "8,500+ Patients Treated",
    updatedAt: new Date()
  },
  {
    icon: "HeartHandshake",
    title: "Sanitary Napkin Distribution",
    subtitle: "Hygiene Literacy & Free Kits",
    category: "Healthcare & Hygiene",
    image: "/images/project_sanitary.jpg",
    gradient: "from-pink-900/90 via-pink-800/70 to-transparent",
    accent: "#EC4899",
    accentBg: "bg-pink-500/20",
    accentText: "text-pink-300",
    accentBorder: "border-pink-400/40",
    benefits: ["High-quality sanitary kit supply", "Menstrual hygiene workshops", "Academic counseling booths"],
    stats: "50k+ Packs Distributed",
    updatedAt: new Date()
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    let projects = await db
      .collection("projects")
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    // If empty, seed default projects
    if (projects.length === 0) {
      await db.collection("projects").insertMany(defaultProjects);
      projects = await db
        .collection("projects")
        .find({})
        .sort({ updatedAt: -1 })
        .toArray();
    }
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    const newProject = {
      ...body,
      benefits: Array.isArray(body.benefits) ? body.benefits : (body.benefits || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      updatedAt: new Date(),
    };
    
    const result = await db.collection("projects").insertOne(newProject);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateFields } = body;
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing project id" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    const normalizedUpdate = {
      ...updateFields,
      benefits: Array.isArray(updateFields.benefits) ? updateFields.benefits : (updateFields.benefits || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      updatedAt: new Date(),
    };
    
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: normalizedUpdate }
    );
    
    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("skillmissionindia");
    
    await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
