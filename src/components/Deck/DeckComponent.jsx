import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Alert } from '@mui/material';
import DeckHeader from '../DeckHeader/DeckHeaderComponent';
import DeckDetailComponent from '../DeckDetail/DeckDetailComponent';

const DeckComponent = () => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <Box sx={{ height: '100vh', overflowY: 'auto' }}>
      <DeckHeader
        name={deck.name}
        image_url={deck.image_url}
        race={deck.race}
      ></DeckHeader>
      <Box>
        <DeckDetailComponent></DeckDetailComponent>
      </Box>
    </Box>
  );
};

export default DeckComponent;
