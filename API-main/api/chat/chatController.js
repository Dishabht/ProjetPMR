const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route pour le chatbot IA
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message requis' });
    }

    // Utiliser Hugging Face API (gratuit)
    const HF_API_TOKEN = process.env.HUGGING_FACE_API_KEY || 'hf_kYTCDQjKcjKcjKcjKcjKcjKcjKcjKcjK'; // À remplacer

    const systemPrompt = `Tu es un assistant IA pour PMove, une plateforme de transport accessible.
Tu aides les utilisateurs avec :
- Les réservations de trajets
- La gestion du portefeuille (Wallet) et paiements
- Les questions sur les profils
- L'assistance client
- Les comptes et authentification

Sois amical, utile et concis. Réponds toujours en français.
Base-toi sur les fonctionnalités du site pour tes réponses.`;

    // Construction du contexte pour Hugging Face
    let conversationContext = systemPrompt + '\n\n';
    
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg) => {
        if (msg.sender === 'user') {
          conversationContext += `Utilisateur: ${msg.text}\n`;
        } else {
          conversationContext += `Assistant: ${msg.text}\n`;
        }
      });
    }

    conversationContext += `Utilisateur: ${message}\nAssistant: `;

    try {
      // Appel à Hugging Face - Modèle gratuit
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          inputs: conversationContext,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.9,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HF_API_TOKEN}`,
          },
          timeout: 15000,
        }
      );

      let botResponse = '';

      if (Array.isArray(response.data) && response.data[0]) {
        if (response.data[0].generated_text) {
          // Extraire seulement la réponse du bot
          const fullText = response.data[0].generated_text;
          const assistantIndex = fullText.indexOf('Assistant: ');
          if (assistantIndex !== -1) {
            botResponse = fullText.substring(assistantIndex + 11).trim();
          } else {
            botResponse = fullText.trim();
          }
        }
      }

      // Fallback si la réponse est vide
      if (!botResponse) {
        botResponse = "Je suis en train de traiter votre demande. Pouvez-vous poser la question autrement?";
      }

      // Limiter la réponse à 300 caractères pour éviter les réponses trop longues
      if (botResponse.length > 300) {
        botResponse = botResponse.substring(0, 300) + '...';
      }

      res.json({ response: botResponse });
    } catch (hfError) {
      console.error('Erreur Hugging Face:', hfError.message);

      // Réponse de fallback en cas d'erreur
      const fallbackResponses = [
        "Je suis désolé, je rencontre une petite difficulté. Pouvez-vous reformuler votre question?",
        "Intéressant! Pouvez-vous me donner plus de détails pour mieux vous aider?",
        "C'est une bonne question! Pour mieux vous répondre, pouvez-vous préciser votre demande?",
      ];

      res.json({
        response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      });
    }
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
