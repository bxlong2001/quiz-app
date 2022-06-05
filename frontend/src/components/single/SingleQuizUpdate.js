import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalUpdate from '../modals/ModalUpdate';
import ModalDeleteExam from '../modals/ModalDeleteExam';
import { AdminContext } from '../../contexts/AdminContext';

const SingleQuizUpdate = ({exam}) => {
    const {deleteExam} = useContext(AdminContext)
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeleteExam, setShowDeleteExam] = useState(false);

    const handleCloseUpdate = useCallback(() => setShowUpdate(false), [])
    const handleCloseDeleteExam = useCallback(() => setShowDeleteExam(false), [])

    const handleShowUpdate = () => {
        setShowUpdate(true)
    }

    const handleShowDeleteExam = () => {
        setShowDeleteExam(true)
    }


    return (
        <>
            {showUpdate && <ModalUpdate
                quiz={exam}
                showUpdate={showUpdate}
                handleCloseUpdate={handleCloseUpdate}
                handleSubmit={deleteExam}
            />}
            {showDeleteExam && <ModalDeleteExam
                id={exam._id}
                showDeleteExam={showDeleteExam}
                handleCloseDeleteExam={handleCloseDeleteExam}
            />}
            <tr>
                <td>
                {exam.question}
                </td>
                <td>{exam.answer_a}</td>
                <td>{exam.answer_b}</td>
                <td>{exam.answer_c}</td>
                <td>{exam.answer_d}</td>
            <td>{exam.answer_true}</td>
            <td>
                <Button variant='success' onClick={() => handleShowUpdate(exam)}>
                <FontAwesomeIcon icon={faPencil}/>
                </Button>
                <Button variant='danger' onClick={() => handleShowDeleteExam()}>
                <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
            </tr>
        </>
    )
}

export default SingleQuizUpdate