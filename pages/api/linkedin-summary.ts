import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests for fetching summary stats
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Use LinkedIn API to fetch post analytics (replace URL with the correct endpoint)
    const response = await axios.get("https://api.linkedin.com/v2/shares/statistics", {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
      },
    });

    // Extract summary statistics from the LinkedIn API response
    const data = response.data;

    // Logic for calculating stats
    const totalViews = data.elements.reduce((acc: number, post: any) => acc + (post.views || 0), 0);
    const totalEngagements = data.elements.reduce((acc: number, post: any) => acc + (post.engagements || 0), 0);
    const clickThroughRate = totalEngagements / totalViews || 0;
    const avgEngagementRate = totalEngagements / data.elements.length || 0;

    // Return the computed summary stats
    res.status(200).json({
      totalViews,
      totalEngagements,
      clickThroughRate: clickThroughRate.toFixed(2),
      avgEngagementRate: avgEngagementRate.toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching LinkedIn data:", error || error);
    res.status(500).json({ message: "Error fetching LinkedIn data" });
  }
} 