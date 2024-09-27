export const generateConfirmationNumber = () => {
    return Math.random().toString(36).substring(2, 11).toUpperCase();
};

export const sendReservationConfirmation = async (reservationData) => {
    try {
        const response = await fetch('/api/send-confirmation-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (!response.ok) {
            throw new Error('Failed to send confirmation email');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }

};

