import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: "10",
    difficulty: "easy",
    category: "sports"
  })
  const fetchQuestion = async (url) => {
    setLoading(true)
    setWaiting(false)
    try {
      const response = await axios(url).catch(err => console.log(err))
      if (response) {
        const data = response.data.results
        console.log(data);
        if (data.length > 0) {
          setQuestions(data)
          setWaiting(false)
          setLoading(false)
          setError(false)
        } else {
          setError(true)
          setWaiting(true)
          setLoading(true)
        }
      } else {
        setWaiting(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const checkAnswer = value => {
    if (value) {
      setCorrect((oldState) => {
        return oldState + 1
      })
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${table[quiz.category]}&difficulty=${quiz.difficulty}&type=multiple`
    fetchQuestion(url)
  }

  return <AppContext.Provider value={{ quiz, handleSubmit, handleChange, closeModal, nextQuestion, checkAnswer, loading, waiting, index, error, correct, isModalOpen, questions }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
