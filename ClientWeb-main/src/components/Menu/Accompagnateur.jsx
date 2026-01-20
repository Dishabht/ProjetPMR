import React, {useState} from "react";


const Accompagnateur = () => {
    const [formData, setFormData] = useState({
        name_acc: '',
        surname_acc: '',
        num_acc: '',
        mail_acc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch ('http://localhost:3000/acc/accAdd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Accompagnateur ajouté avec succès');
            } else {
                alert(`Erreur: ${result.error}`);
            }
        } catch (error) {
            alert('Erreur lors de l\'envoi des données');
        }
    };


    const formStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        paddingTop: '150px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '3px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer'
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input type="text" name="name_acc" placeholder="Name" value={formData.name} onChange={handleChange} required style={inputStyle} autoComplete="given-name" />
            <input type="text" name="surname_acc" placeholder="Surname" value={formData.surname} onChange={handleChange} required style={inputStyle} autoComplete="family-name" />
            <input type="text" name="num_acc" placeholder="Numéro de téléphone" value={formData.num} onChange={handleChange} required style={inputStyle} autoComplete="tel" />
            <input type="email" name="mail_acc" placeholder="Email" value={formData.mail} onChange={handleChange} required style={inputStyle} autoComplete="email" />

            <button type="submit" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}>Ajouter Client</button>
        </form>
    );
};

export default Accompagnateur;