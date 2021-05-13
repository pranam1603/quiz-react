import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { handleSubmit, handleChange, quiz, error } = useGlobalContext()
  return <main>
    <section className="quiz quiz-small">
      <form className="setup-quiz">
        <h2>setup quiz</h2>
        {/* amount */}
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input id="amount" name="amount" className="form-input" type="number" min={1} max={50} value={quiz.amount} onChange={handleChange} />
        </div>
        <div className="form-control">
          <label htmlFor="category" >category</label>
          <select className="form-input" name="category" id="category" value={quiz.category} onChange={handleChange}>
            <option value="sports">Sports</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="difficuilty" >difficuilty</label>
          <select className="form-input" name="difficuilty" id="difficuilty" value={quiz.difficuilty} onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {error && (
          <p className="error">
            can't generate questions !
          </p>
        )}

        <button className="submit-btn" type="submit" onClick={handleSubmit}>start</button>
      </form>
    </section>
  </main>
}
export default SetupForm
