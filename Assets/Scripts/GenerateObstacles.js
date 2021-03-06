#pragma strict

public var boxObstacle:Transform;
public var trashcanObstacle:Transform;
public var pipeObstacle:Transform;
public var row1Obstacle:Transform;
public var row2Obstacle:Transform;
public var row3Obstacle:Transform;
public var row4Obstacle:Transform;
public var row5Obstacle:Transform;
public var distanceAwayToAdd: int = 400;

var usedObjectQueue = new Queue();
var generateFrequency:int = 60;
var recycleOffset = 80;
var stopGeneration:boolean = false;
var count = 0;
var reductionCount = 0;

function Start () {
	
	for(var j = 1; j <= 5; j++)
	{
		var type = Random.Range(1,13);
		type = Mathf.Floor(type);
		CreateScenario(type,0,100*j);
	}
	
	count = 5;
}

function Update () 
{
	var player:GameObject;
	player = GameObject.Find("Player");
	var travelled = player.GetComponent(Player).distanceTraveled;
	
	if(count*generateFrequency + 200 < travelled && !stopGeneration)
	{
		stopGeneration = true;
		var type = Random.Range(1,13);
		//var type  = 2;
		type = Mathf.Floor(type);
		CreateScenario(type,travelled,distanceAwayToAdd);
		count++;
	}
	else if(stopGeneration)
	{
		stopGeneration = false;
	}
	
	if(usedObjectQueue.Count > 0)
	{
		var firstObs:Transform = usedObjectQueue.Peek();
	
		if(firstObs.position.z + recycleOffset < travelled)
		{
			print("Delete" + firstObs.position.z + ":" + recycleOffset + ":" + travelled);
			usedObjectQueue.Dequeue();
			Destroy(firstObs.gameObject);
		}
	}
	
	if(travelled/250> reductionCount)
	{
		generateFrequency += 5;
		reductionCount++;
	}
	
}

function CreateScenario (obstacleType : int, distanceToPlace : int, distanceAwayToAdd : int)
{
	var obstacle:Transform;
	switch(obstacleType)
	{
		case 1:
		case 2:
		case 3:
			//repurpose obstacle to 2 trashcan
			obstacle = GenerateObstacle(trashcanObstacle);
			obstacle.transform.position.x = Random.Range(-9,9);
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			
			obstacle = GenerateObstacle(trashcanObstacle);
			obstacle.transform.position.x = Random.Range(-9,9);
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 4:
		case 5:
			//repurpose obstacle to box obstacle
			obstacle = GenerateObstacle(boxObstacle);
			obstacle.name = "PowerUp";
			obstacle.transform.position.x = Random.Range(-9,9);
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 6:
		case 7:
			//repurpose obstacle to pipe obstacle
			obstacle = GenerateObstacle(pipeObstacle);
			obstacle.transform.position.x = -9;
			obstacle.transform.position.y = 5;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 8:
			obstacle = GenerateObstacle(row1Obstacle);
			obstacle.transform.position.x = 0;
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 9:
			obstacle = GenerateObstacle(row2Obstacle);
			obstacle.transform.position.x = 0;
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 10:
			obstacle = GenerateObstacle(row3Obstacle);
			obstacle.transform.position.x = 0;
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 11:
			obstacle = GenerateObstacle(row4Obstacle);
			obstacle.transform.position.x = 0;
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		case 12:
			obstacle = GenerateObstacle(row5Obstacle);
			obstacle.transform.position.x = 0;
			obstacle.transform.position.y = 2;
			obstacle.transform.position.z = distanceToPlace+distanceAwayToAdd;
			break;
		default:
			print("something broke");
			break;
	}
}

function GenerateObstacle (obstacle : Transform)
{

	var newObs:Transform;
	newObs = Instantiate (obstacle, Vector3(0, 0, 0), obstacle.rotation );
	usedObjectQueue.Enqueue(newObs);
	return newObs;
}

/*using UnityEngine;
using System.Collections.Generic;

public class SkylineManager : MonoBehaviour {

	public Transform prefab;
	public int numberOfObjects;
	public float recycleOffset;

	private Vector3 nextPosition;
	private Queue<Transform> objectQueue;

	void Start () {
		objectQueue = new Queue<Transform>(numberOfObjects);
		nextPosition = transform.localPosition;
		for(int i = 0; i < numberOfObjects; i++){
			Transform o = (Transform)Instantiate(prefab);
			o.localPosition = nextPosition;
			nextPosition.x += o.localScale.x;
			objectQueue.Enqueue(o);
		}
	}

	void Update () {
		if(objectQueue.Peek().localPosition.x + recycleOffset < Player.distanceTraveled){
			Transform o = objectQueue.Dequeue();
			o.localPosition = nextPosition;
			nextPosition.x += o.localScale.x;
			objectQueue.Enqueue(o);
		}
	}
}*/