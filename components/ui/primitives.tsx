import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const buttonClass: Record<ButtonVariant, string> = {
  primary: "ib-button ib-button-primary",
  secondary: "ib-button ib-button-secondary",
  ghost: "ib-button ib-button-ghost",
  danger: "ib-button ib-button-danger"
};

export function Button({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={`${buttonClass[variant]} ${className}`.trim()} {...props} />;
}

export function IconButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`ib-icon-button ${className}`.trim()} {...props} />;
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`ib-input ${className}`.trim()} {...props} />;
}

export function Badge({ children, tone = "neutral" }: PropsWithChildren<{ tone?: "neutral" | "member" | "success" | "warning" | "danger" }>) {
  return <span className={`ib-badge ib-badge-${tone}`}>{children}</span>;
}

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`ib-card ${className}`.trim()}>{children}</section>;
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <Card className="ib-stat-card">
      <span className="ib-stat-label">{label}</span>
      <strong className="ib-stat-value">{value}</strong>
      {detail ? <span className="ib-stat-detail">{detail}</span> : null}
    </Card>
  );
}
