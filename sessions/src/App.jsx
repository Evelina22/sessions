
import "./App.css";
import avatar1 from './assets/avatar1.jpg'
import avatar2 from './assets/avatar2.jpg'
import avatar3 from './assets/avatar3.jpg'
import avatar4 from './assets/avatar4.jpg'

export default function App() {
  return (
    <div className="board">
      <div className="column">
        <div className="column-header">
          <span className="dot gray"></span>
          <h3>To Do <span className="count">4</span></h3>
        </div>

        <div className="card">
          <span className="badge urgent">Urgent</span>
          <h4>Finalize homepage design</h4>
          <p>Review mockups and implement feedback from stakeholders.</p>
          <div className="meta">
            <span>May 15</span>
            <div className="meta-right">
              <span>2/5</span>
            <img src={avatar1} alt="user" className="avatar"/>
            </div>
          </div>
          <div className="tags">
            <span className="tag blue">Design</span>
            <span className="tag purple">Frontend</span>
          </div>
        </div>

        <div className="card">
          <span className="badge medium">Medium</span>
          <h4>Prepare documentation</h4>
          <p>Create user documentation for new features.</p>
          <div className="meta">
            <span>May 18</span>
            <div className="meta-right">
              <span>0/1</span>
              <img src={avatar2} alt="user" className="avatar" />
            </div>
          </div>
          <div className="tags">
            <span className="tag green">Documentation</span>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="column-header">
          <span className="dot blue"></span>
          <h3>In Progress <span className="count">3</span></h3>
        </div>

        <div className="card">
          <span className="badge urgent">Urgent</span>
          <h4>Fix authentication bug</h4>
          <p>Investigate and resolve login issues reported by users.</p>
          <div className="meta">
            <span> May 12</span>
            <div className="meta-right">
              <span>1/1</span>
              <img src={avatar3} alt="user" className="avatar" />
            </div>
          </div>
          <div className="tags">
            <span className="tag yellow">Bug</span>
            <span className="tag purple">Backend</span>
          </div>

          <div className="comment">
            Found the issue with the JWT validation. Working on fix now.
          </div>
        </div>
      </div>

      <div className="column">
        <div className="column-header">
          <span className="dot green"></span>
          <h3>Done <span className="count">2</span></h3>
        </div>

        <div className="card">
          <span className="badge low">Low</span>
          <h4>Update dependencies</h4>
          <p>Update all npm packages to the latest versions.</p>
          <div className="meta">
            <span> May 8</span>
            <div className="meta-right">
              <span>3/3</span>
              <img src={avatar4} alt="user" className="avatar" />
            </div>
          </div>
          <div className="tags">
            <span className="tag gray">Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
