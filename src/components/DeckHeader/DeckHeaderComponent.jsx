import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const DeckHeader = ({ name, image_url, race }) => {
  image_url = 'https://api.myl.cl/static/helenica.png';
  return (
    <Box
      sx={{
        top: 0,
        zIndex: 1000,
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#13654C',
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          color: 'white',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h6">Raza: {race}</Typography>
      </Box>

      <Box
        sx={{
          position: 'sticky',
          right: 0,
          height: '700px',
          minWidth: '50%',
          minHeight: '100%',
          backgroundImage: `url(${image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          maskImage: 'linear-gradient(to right, transparent 2%, black 40%)',
        }}
      />
    </Box>
  );
};

DeckHeader.propTypes = {
  name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
};

export default DeckHeader;
