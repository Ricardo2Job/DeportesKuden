import { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    totalOrders: 127,
    totalProducts: 45,
    totalUsers: 892,
    totalRevenue: 45780
  });

  // Datos de ejemplo para productos
  const [products, setProducts] = useState([
    { id: 1, name: "Polera Deportiva Roja", price: 25990, stock: 15, status: "Activo" },
    { id: 2, name: "Short Deportivo Azul", price: 19990, stock: 8, status: "Activo" },
    { id: 3, name: "Camiseta Personalizada", price: 32990, stock: 0, status: "Agotado" },
    { id: 4, name: "Conjunto Deportivo", price: 45990, stock: 12, status: "Activo" },
    { id: 5, name: "Medias Deportivas", price: 8990, stock: 25, status: "Activo" },
    { id: 6, name: "Gorra Personalizada", price: 15990, stock: 3, status: "Poco Stock" }
  ]);

  // Función para cambiar el estado de un producto
  const changeProductStatus = (productId, newStatus) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, status: newStatus }
          : product
      )
    );
  };

  // Datos de ejemplo para pedidos
  const [orders, setOrders] = useState([
    { id: 1001, customer: "Carlos Mendoza", total: 51980, status: "Pendiente", date: "2025-06-20" },
    { id: 1002, customer: "María González", total: 25990, status: "Completado", date: "2025-06-19" },
    { id: 1003, customer: "Diego Rodríguez", total: 77970, status: "En Proceso", date: "2025-06-21" },
    { id: 1004, customer: "Ana Martínez", total: 19990, status: "Completado", date: "2025-06-18" }
  ]);

  // Datos de ejemplo para usuarios
  const [users, setUsers] = useState([
    { id: 1, name: "Carlos Mendoza", email: "carlos@email.com", role: "Cliente", status: "Activo" },
    { id: 2, name: "María González", email: "maria@email.com", role: "Cliente", status: "Activo" },
    { id: 3, name: "Admin User", email: "admin@deporteskuden.com", role: "Administrador", status: "Activo" },
    { id: 4, name: "Diego Rodríguez", email: "diego@email.com", role: "Cliente", status: "Inactivo" }
  ]);

  const renderStats = () => (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📦</div>
        <div className="stat-info">
          <h3>{stats.totalOrders}</h3>
          <p>Pedidos Totales</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🛍️</div>
        <div className="stat-info">
          <h3>{stats.totalProducts}</h3>
          <p>Productos</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-info">
          <h3>{stats.totalUsers}</h3>
          <p>Usuarios</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-info">
          <h3>${stats.totalRevenue.toLocaleString()}</h3>
          <p>Ingresos</p>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2>Gestión de Productos</h2>
        <button className="add-btn">+ Agregar Producto</button>
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  <select 
                    className="status-select"
                    value={product.status}
                    onChange={(e) => changeProductStatus(product.id, e.target.value)}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Agotado">Agotado</option>
                    <option value="Poco Stock">Poco Stock</option>
                    <option value="Descontinuado">Descontinuado</option>
                  </select>
                </td>
                <td>
                  <button className="action-btn edit">✏️</button>
                  <button className="action-btn delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2>Gestión de Pedidos</h2>
        <button className="filter-btn">Filtrar</button>
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.total.toLocaleString()}</td>
                <td>
                  <span className={`status ${order.status === 'Completado' ? 'completed' : order.status === 'Pendiente' ? 'pending' : 'processing'}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="action-btn view">👁️</button>
                  <button className="action-btn edit">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2>Gestión de Usuarios</h2>
        <button className="add-btn">+ Agregar Usuario</button>
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status ${user.status === 'Activo' ? 'active' : 'inactive'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn edit">✏️</button>
                  <button className="action-btn delete">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="admin-content">
            <h2>Panel de Control</h2>
            {renderStats()}
            <div className="charts-section">
              <div className="chart-card">
                <h3>Ventas Recientes</h3>
                <div className="chart-placeholder">
                  <p>Gráfico de ventas mensuales</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>Productos Más Vendidos</h3>
                <div className="chart-placeholder">
                  <p>Gráfico de productos populares</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'users':
        return renderUsers();
      case 'settings':
        return (
          <div className="admin-content">
            <h2>Configuración</h2>
            <div className="settings-grid">
              <div className="setting-card">
                <h3>Configuración General</h3>
                <p>Ajustes básicos del sitio web</p>
                <button className="setting-btn">Configurar</button>
              </div>
              <div className="setting-card">
                <h3>Métodos de Pago</h3>
                <p>Gestionar formas de pago</p>
                <button className="setting-btn">Configurar</button>
              </div>
              <div className="setting-card">
                <h3>Notificaciones</h3>
                <p>Configurar alertas y notificaciones</p>
                <button className="setting-btn">Configurar</button>
              </div>
            </div>
          </div>
        );
      default:
        return renderStats();
    }
  };

  return (
    <div className="admin-container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #ffffff;
          line-height: 1.6;
        }

        .admin-container {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }

        /* Header Principal (igual al original) */
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          border-bottom: 2px solid #666;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .logo {
          height: 45px;
          width: 160px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .logo:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .nav {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 6px;
          position: relative;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          color: #888;
          border-color: #888;
          background: rgba(136, 136, 136, 0.1);
        }

        .dropdown {
          position: relative;
        }

        .dropbtn {
          background: transparent;
          border: 1px solid transparent;
          color: #ffffff;
          padding: 10px 15px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dropbtn:hover {
          color: #888;
          border-color: #888;
          background: rgba(136, 136, 136, 0.1);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          min-width: 200px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border: 1px solid #666;
          top: 100%;
          left: 0;
          z-index: 1000;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a {
          color: #ffffff;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: all 0.3s ease;
        }

        .dropdown-content a:hover {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
        }

        .boton-nav-rojo {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white !important;
          border: none !important;
        }

        .boton-nav-rojo:hover {
          background: linear-gradient(45deg, #b91c1c, #dc2626);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-icon {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .user-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .logout-main-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
          border: 1px solid #888;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .logout-main-btn:hover {
          background: rgba(136, 136, 136, 0.3);
          transform: translateY(-1px);
        }

        /* Header Administrativo */
        .admin-header {
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(20px);
          padding: 1rem 2rem;
          border-bottom: 1px solid #333;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .admin-logo {
          height: 45px;
          width: 200px;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-info {
          text-align: right;
        }

        .user-name {
          font-weight: bold;
          color: #888;
        }

        .user-role {
          font-size: 0.8rem;
          color: #666;
        }

        .logout-btn {
          background: rgba(136, 136, 136, 0.2);
          color: #888;
          border: 1px solid #888;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(136, 136, 136, 0.3);
          transform: translateY(-1px);
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-right: 1px solid #333;
          padding: 140px 0 20px 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-menu {
          list-style: none;
          padding: 0;
        }

        .sidebar-item {
          margin: 5px 0;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 25px;
          color: #cccccc;
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .sidebar-link:hover {
          background: rgba(136, 136, 136, 0.1);
          color: #888;
          border-left-color: #888;
        }

        .sidebar-link.active {
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border-left-color: #dc2626;
        }

        .sidebar-icon {
          font-size: 1.2rem;
          width: 20px;
          text-align: center;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 160px 30px 30px 30px;
          min-height: 100vh;
        }

        .admin-content h2 {
          font-size: 2.2rem;
          margin-bottom: 30px;
          background: linear-gradient(45deg, #ffffff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 25px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: #888;
          box-shadow: 0 10px 30px rgba(136, 136, 136, 0.2);
        }

        .stat-icon {
          font-size: 2.5rem;
          background: linear-gradient(45deg, #dc2626, #ef4444);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h3 {
          font-size: 2rem;
          color: #888;
          margin-bottom: 5px;
        }

        .stat-info p {
          color: #cccccc;
          font-size: 0.9rem;
        }

        /* Tables */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .add-btn, .filter-btn {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-btn:hover, .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .table-container {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 20px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          background: rgba(220, 38, 38, 0.1);
          color: #888;
          padding: 15px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid rgba(136, 136, 136, 0.2);
        }

        .admin-table td {
          padding: 15px;
          border-bottom: 1px solid rgba(136, 136, 136, 0.1);
          color: #cccccc;
        }

        .admin-table tr:hover {
          background: rgba(136, 136, 136, 0.05);
        }

        .status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status.active {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .status.inactive {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .status.low-stock {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }

        .status.discontinued {
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
        }

        /* Status Select */
        .status-select {
          background: rgba(26, 26, 26, 0.8);
          border: 1px solid rgba(136, 136, 136, 0.3);
          color: #cccccc;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .status-select:hover {
          border-color: #888;
          background: rgba(26, 26, 26, 0.9);
        }

        .status-select:focus {
          outline: none;
          border-color: #dc2626;
          box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
        }

        .status-select option {
          background: rgba(26, 26, 26, 0.95);
          color: #cccccc;
          padding: 8px;
        }

        .status.completed {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .status.pending {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }

        .status.processing {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .action-btn {
          background: rgba(136, 136, 136, 0.2);
          border: 1px solid rgba(136, 136, 136, 0.3);
          color: #888;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          margin: 0 5px;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .action-btn:hover {
          background: rgba(136, 136, 136, 0.3);
          transform: translateY(-1px);
        }

        .action-btn.edit:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .action-btn.delete:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ef4444;
        }

        .action-btn.view:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: #22c55e;
          color: #22c55e;
        }

        /* Charts Section */
        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }

        .chart-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 25px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
        }

        .chart-card h3 {
          color: #888;
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .chart-placeholder {
          height: 200px;
          background: rgba(136, 136, 136, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-style: italic;
        }

        /* Settings Grid */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .setting-card {
          background: rgba(26, 26, 26, 0.8);
          border-radius: 15px;
          padding: 25px;
          border: 1px solid rgba(136, 136, 136, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .setting-card:hover {
          transform: translateY(-5px);
          border-color: #888;
        }

        .setting-card h3 {
          color: #888;
          margin-bottom: 10px;
        }

        .setting-card p {
          color: #cccccc;
          margin-bottom: 20px;
        }

        .setting-btn {
          background: linear-gradient(45deg, #dc2626, #ef4444);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .setting-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sidebar {
            width: 250px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
            padding: 160px 20px 20px 20px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .charts-section {
            grid-template-columns: 1fr;
          }

          .table-container {
            overflow-x: scroll;
          }
        }
      `}</style>

      {/* Header Principal */}
      <header className="main-header">
        <div className="logo">Deportes Kuden</div>

        <nav className="nav">
          <a href="/inicio" className="nav-link">Inicio</a>

          <div className="dropdown">
            <a href="/productos" className="dropbtn">Productos ▼</a>
            <div className="dropdown-content">
              <a href="/poleras">Poleras Deportivas</a>
              <a href="/shorts">Shorts</a>
              <a href="/accesorios">Accesorios</a>
            </div>
          </div>

          <a href="/company" className="nav-link">Nuestra Compañía</a>
          <a href="/custom" className="nav-link">Personalización</a>
          <a href="/bomberos" className="nav-link boton-nav-rojo">Bomberos Chile</a>
        </nav>

        <div className="user-menu">
          <div className="dropdown">
            <button className="dropbtn">Usuario ▼</button>
            <div className="dropdown-content">
              <a href="/login">Iniciar Sesión</a>
              <a href="/register">Registrarse</a>
              <a href="/account">Mi Cuenta</a>
              <button className="logout-main-btn">Cerrar Sesión</button>
            </div>
          </div>
          <div className="user-icon">👤</div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <a 
              href="#" 
              className={`sidebar-link ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <span className="sidebar-icon">📊</span>
              Dashboard
            </a>
          </li>
          <li className="sidebar-item">
            <a 
              href="#" 
              className={`sidebar-link ${activeSection === 'products' ? 'active' : ''}`}
              onClick={() => setActiveSection('products')}
            >
              <span className="sidebar-icon">🛍️</span>
              Productos
            </a>
          </li>
          <li className="sidebar-item">
            <a 
              href="#" 
              className={`sidebar-link ${activeSection === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveSection('orders')}
            >
              <span className="sidebar-icon">📦</span>
              Pedidos
            </a>
          </li>
          <li className="sidebar-item">
            <a 
              href="#" 
              className={`sidebar-link ${activeSection === 'users' ? 'active' : ''}`}
              onClick={() => setActiveSection('users')}
            >
              <span className="sidebar-icon">👥</span>
              Usuarios
            </a>
          </li>
          <li className="sidebar-item">
            <a 
              href="#" 
              className={`sidebar-link ${activeSection === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveSection('settings')}
            >
              <span className="sidebar-icon">⚙️</span>
              Configuración
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;