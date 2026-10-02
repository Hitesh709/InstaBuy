"use client";

import { useState } from "react";
import { canReceiveMemberPricing, type CustomerEligibilityStatus, type MembershipStatus } from "../../lib/customer-account";

const benefits = [
  ["⚡", "8 active member deals", "Exclusive prices available now"],
  ["₹", "₹1,240 saved", "Your estimated savings this month"],
  ["✓", "Verified customer", "Member pricing is unlocked"],
];

export default function AccountPage() {
  const [eligibility] = useState<CustomerEligibilityStatus>("VERIFIED");
  const [membership] = useState<MembershipStatus>("ACTIVE");
  const [notifications, setNotifications] = useState(true);
  const unlocked = canReceiveMemberPricing(eligibility, membership);

  return (
    <main className="accountShell">
      <header className="accountHeader">
        <a href="/" className="backLink">← InstaBuy</a>
        <span className="accountPill">Customer account</span>
        <div className="avatar">HK</div>
      </header>
      <section className="accountHero">
        <div>
          <p className="eyebrow">MEMBER PROFILE</p>
          <h1>Good to see you, Hitesh.</h1>
          <p>Manage your identity, eligibility, benefits and delivery preferences from one place.</p>
        </div>
        <div className={unlocked ? "statusCard unlocked" : "statusCard"}>
          <span>{unlocked ? "✓" : "!"}</span>
          <div><strong>{unlocked ? "Member pricing unlocked" : "Verification required"}</strong><small>{eligibility} · {membership}</small></div>
        </div>
      </section>
      <section className="benefitGrid">
        {benefits.map(([icon, title, detail]) => <article className="benefitCard" key={title}><span>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div></article>)}
      </section>
      <div className="accountGrid">
        <section className="accountPanel">
          <div className="panelHeading"><div><p className="eyebrow">PERSONAL DETAILS</p><h2>Your profile</h2></div><button className="secondary">Edit profile</button></div>
          <div className="fieldGrid"><div><small>Full name</small><strong>Hitesh Kansara</strong></div><div><small>Mobile</small><strong>+91 ••••••••••</strong></div><div><small>Email</small><strong>Not added</strong></div><div><small>Customer ID</small><strong>IB-CUST-0001</strong></div></div>
        </section>
        <section className="accountPanel">
          <div className="panelHeading"><div><p className="eyebrow">DELIVERY</p><h2>Saved address</h2></div><button className="secondary">Manage</button></div>
          <div className="addressCard"><span>⌂</span><div><strong>Home</strong><p>Rajkot, Gujarat · Address will be added during onboarding.</p></div></div>
        </section>
        <section className="accountPanel">
          <div className="panelHeading"><div><p className="eyebrow">NOTIFICATIONS</p><h2>Preferences</h2></div><button className={notifications ? "toggle on" : "toggle"} onClick={() => setNotifications(!notifications)} aria-pressed={notifications}><i /></button></div>
          <p className="panelCopy">Receive important order and membership updates. Promotional notifications can be controlled separately.</p>
          <div className="preferenceRow"><span>Transactional updates</span><b>Always on</b></div>
          <div className="preferenceRow"><span>Member deal alerts</span><b>{notifications ? "On" : "Off"}</b></div>
        </section>
        <section className="accountPanel benefitLarge">
          <div className="panelHeading"><div><p className="eyebrow">YOUR BENEFITS</p><h2>Member value</h2></div><a href="/" className="secondary">Shop deals →</a></div>
          <div className="benefitRows"><div><span>⚡</span><div><strong>Partner-store pricing</strong><small>Eligible purchases receive applicable merchant offers.</small></div></div><div><span>◷</span><div><strong>8 live offers</strong><small>Explore current deals from your InstaBuy network.</small></div></div><div><span>₹</span><div><strong>Savings tracking</strong><small>Your savings are recorded with completed orders.</small></div></div></div>
        </section>
      </div>
    </main>
  );
}
