import React, { useEffect, useState } from "react"; //impor React

//create your first component
const Home = () => {
	const [todo, setTodo] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/karlos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => setTodo(data))
			.catch(error => console.log("Error", error));
	}, []);

	const add = text => {
		var newTodo = [...todo, { label: text, done: false }];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/karlos", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTodo)
		})
			.then(response => response.json())
			.then(data => {
				setInputValue("");
				setTodo(newTodo);
			});
	};

	const removeElement = key => {
		let newTodo = todo.filter((t, i) => i !== key);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/karlos", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTodo)
		})
			.then(response => response.json())
			.then(data => {
				setTodo([newTodo]);
			});
	};

	const deleteAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/karlos", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				setTodo([]);
			});
	};

	return (
		<div className="container">
			<div className="titlecont">
				<h1 className="title">todos</h1>
			</div>
			<div className="inputcont">
				<input
					onChange={e => setInputValue(e.target.value)}
					type="text"
					placeholder="What needs to be done"
					value={inputValue}
					className="inp"
				/>
				<button className="b1" onClick={() => add(inputValue)}>
					Add Task
				</button>
				<ul className="ul1">
					{todo.map((t, key) => (
						<div
							onClick={() => removeElement(key)}
							key={key}
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								margin: 10
							}}>
							<li>{t.label}</li>
							<button className="b1">Delete</button>
						</div>
					))}
				</ul>
				<button className="b1" onClick={() => deleteAll()}>
					Delete All
				</button>
			</div>
		</div>
	);
};

export default Home;
