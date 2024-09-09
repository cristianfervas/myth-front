import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeckComponent.css';


const DeckComponent = () => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/deck/3?userName=Foxboro');
        setDeck(response.data);
      } catch (err) {
        setError('Error fetching deck');
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const groupedCards = deck.cards.reduce((groups, card) => {
    const group = groups[card.type] || { cards: [], totalCopies: 0 };
    group.cards.push(card);
    group.totalCopies += card.CardDeck.copies;
    groups[card.type] = group;
    return groups;
  }, {});

  return (
    <div className="deck-container">
      {/* Sección izquierda para mostrar la carta seleccionada */}
      <div className="card-preview">
        {selectedCard && (
          <img src={selectedCard.image_url} alt={selectedCard.name} className="preview-image" />
        )}
      </div>

      {/* Sección derecha con el listado de cartas agrupadas por tipo */}
      <div className="card-list">
        {Object.entries(groupedCards).map(([type, group]) => (
          <div key={type} className="card-group">
            <h2>{type} ({group.totalCopies})</h2>
            <ul>
              {group.cards.map((card) => (
                <li
                  key={card.card_id}
                  onMouseEnter={() => setSelectedCard(card)}
                  onMouseLeave={() => setSelectedCard(null)}
                  className="card-item"
                >
                  {card.CardDeck.copies}x {card.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckComponent;
