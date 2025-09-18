import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css';
import toast from 'react-hot-toast';

const List = () => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('http://localhost:8080/api/medications/users/1');
                setMedications(response.data);
            } catch (apiError) {
                console.error('Error al cargar los medicamentos:', apiError);
                setError('No se pudieron cargar los medicamentos. Inténtalo de nuevo más tarde.');
                toast.error('Error al cargar los medicamentos');
            } finally {
                setLoading(false);
            }
        };
        fetchMedications();
    }, []);

    const handleDelete = async (medicationId, medicationName) => {
        toast((t) => (
            <div>
                <p>¿Estás seguro de que quieres eliminar "{medicationName}"?</p>
                <div style={{ marginTop: '0.5rem' }}>
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`http://localhost:8080/api/medications/${medicationId}`);
                                setMedications(medications.filter(med => med.id !== medicationId));
                                toast.success(`"${medicationName}" ha sido eliminado.`);
                            } catch (err) {
                                console.error(err);
                                toast.error('No se pudo eliminar el medicamento.');
                            }
                            toast.dismiss(t.id);
                        }}
                        style={{
                            marginRight: '0.5rem',
                            alignContent: 'center',
                            backgroundColor: '#5BAEE4',
                            color: 'black',
                            border: 'none',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                        }}
                    >
                        Sí
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            backgroundColor: '#5BAEE4',
                            alignContent: 'center',
                            color: 'black',
                            border: 'none',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        ));
    };

    if (loading) return <p>Cargando medicamentos...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Mis Medicamentos</h1>
            {medications.length === 0 ? (
                <p>No tienes ningún medicamento guardado.</p>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dosis</th>
                            <th>Notas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications.map((med) => (
                            <tr key={med.id}>
                                <td>{med.name}</td>
                                <td>{med.dosageQuantity} {med.dosageUnit}</td>
                                <td>{med.notes}</td>
                                <td>
                                    <button className='delete-btn'
                                        onClick={() => handleDelete(med.id, med.name)}>
                                        Eliminar
                                    </button>

                                    <Link to={`/medicamentos/edit/${med.id}`}>
                                        <button className='edit-btn'>Editar</button>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default List;