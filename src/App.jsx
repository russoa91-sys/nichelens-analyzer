import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Search,
  DollarSign,
  User,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Zap,
  Lock
} from "lucide-react";

/* -------------------- Utility (Simulated AI Logic) -------------------- */

function simulateTAI(text) {
  const lengthScore = text.length;
  if (lengthScore < 100) {
    return {
      status: "success",
      text:
        "Your listing is very short. Consider expanding your title and description with long-tail keywords such as “personalized gift”, “handmade decor”, or “unique Etsy find” to improve discoverability."
    };
  }
  if (lengthScore < 400) {
    return {
      status: "success",
      text:
        "Your listing has a decent foundation, but keyword depth is limited. Add descriptive modifiers, buyer-intent phrases, and clearer benefits to compete with top-ranking Etsy listings."
    };
  }
  return {
    status: "success",
    text:
      "Strong listing detected. Your keyword usage and structure align well with high-performing Etsy listings. Consider testing seasonal or niche-specific variations to further increase traffic."
  };
}

function simulateLHS(text) {
  const score =
    text.length < 100 ? 42 :
    text.length < 300 ? 63 :
    text.length < 600 ? 78 :
    90;

  return {
    score,
    summary:
      score < 60
        ? "Your listing lacks keyword depth and structure."
        : score < 80
        ? "Your listing is solid but could be optimized further."
        : "Your listing is well-optimized and competitive.",
    suggestions: [
      "Expand your title with buyer-intent keywords",
      "Add more descriptive tags",
      "Strengthen the first 2 lines of your description",
      "Ensure pricing matches market expectations"
    ]
  };
}

function simulateCompetitor() {
  return {
    shopName: "The Vintage Vault Co.",
    listingCount: 450,
    monthlySales: 1200,
    estimatedRevenue: 45000,
    topKeywords: [
      "vintage jewelry",
      "antique decor",
      "handmade gifts"
    ],
    nicheFocus:
      "High-end vintage and repurposed decor targeting collectors and premium buyers."
  };
}

/* -------------------- UI Components -------------------- */

const StatusBadge = ({ plan }) => (
  <span className="px-3 py-1 text-xs uppercase rounded-full bg-gray-200 text-gray-700">
    {plan}
  </span>
);

/* -------------------- Main App -------------------- */

export default function App() {
  const [page, setPage] = useState("optimizer");
  const [listingText, setListingText] = useState("");
  const [taiResult, setTaiResult] = useState(null);
  const [lhsResult, setLhsResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTAI = async () => {
    setLoading(true);
    setTaiResult(null);
    await new Promise(r => setTimeout(r, 1200));
    setTaiResult(simulateTAI(listingText));
    setLoading(false);
  };

  const runLHS = async () => {
    setLoading(true);
    setLhsResult(null);
    await new Promise(r => setTimeout(r, 1200));
    setLhsResult(simulateLHS(listingText));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setPage("optimizer")}
          >
            <BarChart3 className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-bold">NicheLens</span>
          </div>
          <nav className="flex gap-6 items-center">
            <button onClick={() => setPage("optimizer")} className="flex gap-1 items-center">
              <TrendingUp className="w-4 h-4" /> Optimizer
            </button>
            <button onClick={() => setPage("competitor")} className="flex gap-1 items-center">
              <Search className="w-4 h-4" /> Competitor
            </button>
            <button onClick={() => setPage("pricing")} className="flex gap-1 items-center">
              <DollarSign className="w-4 h-4" /> Pricing
            </button>
            <StatusBadge plan="Demo" />
            <User className="w-5 h-5" />
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {page === "optimizer" && (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Etsy Listing Optimizer
            </h2>
            <textarea
              className="w-full border rounded-lg p-4 mb-4"
              rows={8}
              placeholder="Paste your Etsy listing here..."
              value={listingText}
              onChange={e => setListingText(e.target.value)}
            />

            <div className="flex gap-4 mb-6">
              <button
                onClick={runTAI}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Run TAI"}
              </button>
              <button
                onClick={runLHS}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Run LHS"}
              </button>
            </div>

            {taiResult && (
              <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="font-bold mb-2">TAI Result</h3>
                <p>{taiResult.text}</p>
              </div>
            )}

            {lhsResult && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold mb-2">
                  Listing Health Score: {lhsResult.score}
                </h3>
                <p className="mb-2">{lhsResult.summary}</p>
                <ul className="list-disc pl-5">
                  {lhsResult.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {page === "competitor" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Competitor Snapshot</h2>
            <button
              onClick={() => setTaiResult(simulateCompetitor())}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg"
            >
              Generate Snapshot
            </button>

            {taiResult && taiResult.shopName && (
              <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h3 className="text-xl font-bold">{taiResult.shopName}</h3>
                <p>Listings: {taiResult.listingCount}</p>
                <p>Monthly Sales: {taiResult.monthlySales}</p>
                <p>Revenue: ${taiResult.estimatedRevenue}</p>
                <p className="mt-2">{taiResult.nicheFocus}</p>
              </div>
            )}
          </div>
        )}

        {page === "pricing" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Pricing (Demo)</h2>
            <p>This demo showcases UI, logic, and architecture only.</p>
          </div>
        )}
      </main>
    </div>
  );
}
