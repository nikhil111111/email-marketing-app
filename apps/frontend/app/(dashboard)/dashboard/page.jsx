"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Mail,
  Layers3,
  Send,
  MousePointerClick,
} from "lucide-react";

import { getDashboardStats } from "@/services/dashboardService";
import RecentCampaigns from "@/components/dashboard/RecentCampaigns";
import QuickActions from "@/components/dashboard/QuickActions";

import StatCard from "@/components/dashboard/StatCard";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Overview of your email marketing platform.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Contacts"
          value={stats?.totalContacts ?? 0}
          icon={Users}
        />

        <StatCard
          title="Audiences"
          value={stats?.totalAudiences ?? 0}
          icon={Layers3}
        />

        <StatCard
          title="Campaigns"
          value={stats?.totalCampaigns ?? 0}
          icon={Mail}
        />

        <StatCard
          title="Open Rate"
          value={`${stats?.openRate ?? 0}%`}
          icon={Send}
        />

        <StatCard
          title="Click Rate"
          value={`${stats?.clickRate ?? 0}%`}
          icon={MousePointerClick}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentCampaigns
            campaigns={stats?.recentCampaigns || []}
          />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}