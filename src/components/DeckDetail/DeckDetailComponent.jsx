import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';

const DeckDetailComponent = () => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/deck/3?userName=Foxboro',
        );
        setDeck(response.data);
      } catch (err) {
        setError('Error fetching deck');
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const groupedCards = deck.cards.reduce((groups, card) => {
    const group = groups[card.type] || { cards: [], totalCopies: 0 };
    group.cards.push(card);
    group.totalCopies += card.CardDeck.copies;
    groups[card.type] = group;
    return groups;
  }, {});

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Box
        width="30%"
        p={2}
        borderRight={1}
        borderColor="divider"
        bgcolor="background.default"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="auto"
      >
        {selectedCard && (
          <Card sx={{ maxWidth: '100%', maxHeight: '90vh', boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={selectedCard.image_url}
              alt={selectedCard.name}
              sx={{
                height: 'auto',
                width: '100%',
                objectFit: 'contain',
                borderRadius: 2,
              }}
            />
          </Card>
        )}
      </Box>

      <Box width="70%" p={2} overflow="auto" bgcolor="background.paper">
        {Object.entries(groupedCards).map(([type, group]) => (
          <Box key={type} mb={4}>
            <Typography variant="h6" gutterBottom>
              {type} ({group.totalCopies})
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
              gap={2}
            >
              {group.cards.map((card) => (
                <Card
                  key={card.card_id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: 1,
                    height: '230px',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setSelectedCard(card)}
                  onMouseLeave={() => setSelectedCard(null)}
                >
                  <CardMedia
                    component="img"
                    image={card.image_url}
                    alt={card.name}
                    sx={{
                      height: '230px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontSize: '14px',
                    }}
                  >
                    x{card.CardDeck.copies}
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DeckDetailComponent;
