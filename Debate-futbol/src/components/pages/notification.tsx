import React, { useEffect, useState } from "react";
import { notificationService } from "../../services/notificationServices";
import type { Notification} from "../../types/notification";

const NotificationCard: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationService.getAll();
        setNotifications(res)
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Cargando notificaciones...</div>;
  }

  if (notifications.length === 0) {
    return (
      <div className="alert alert-secondary text-center mt-5">
        No tenés notificaciones nuevas
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h5 className="mb-3">Notificaciones</h5>

      {notifications.map((n) => (
        <div key={n.id} className="card mb-2 shadow-sm">
          <div className="card-body d-flex align-items-center gap-3">


            {/* Texto */}
            <div className="flex-grow-1">
              <strong>{n.userSend.name}</strong>{" "}
              {n.type === "Like"
                ? "le dio like a tu post"
                : `comentó en tu post`}
                <hr />
                <br />
                {n.post.content}
              <div className="text-muted small">
                {new Date(n.date).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCard;
