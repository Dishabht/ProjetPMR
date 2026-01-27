exports.checkReservation = async (db, num_reservation) => {
  try {
    const normalized =
      typeof num_reservation === "string" ? num_reservation.trim() : num_reservation;

    const candidates = [];

    if (normalized !== undefined && normalized !== null && normalized !== "") {
      candidates.push(normalized);

      if (typeof normalized === "string") {
        const asNumber = Number(normalized);
        if (!Number.isNaN(asNumber)) {
          candidates.push(asNumber);
        }
      } else if (typeof normalized === "number") {
        candidates.push(String(normalized));
      }
    }

    if (candidates.length === 0) {
      throw new Error("Le numéro de réservation est requis.");
    }

    const collection = db.collection("Reservation");

    console.log("Recherche MongoDB avec :", {
      num_reservation: candidates,
    });

    const reservation = await collection.findOne({
      num_reservation: { $in: candidates },
    });

    console.log("Résultat de la recherche :", reservation);

    return reservation;
  } catch (error) {
    console.error("Erreur lors de la recherche MongoDB :", error);
    throw error;
  }
};
