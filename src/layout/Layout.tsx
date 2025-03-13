import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/greeting">greeting</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </ul>
      </nav>
      <hr />
      <Outlet /> {/* 這裡會渲染對應的子頁面 */}
    </div>
  );
}
