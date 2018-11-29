package de.thm.ii.submissioncheck.controller

import net.unicon.cas.client.configuration.EnableCasClient
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.{Autowired, Value}
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.web.bind.annotation.{RequestMapping, RestController}

/**
  * Service to handle the static communication with the client.
  *
  * @author Andrej Sajenko
  */
@RestController
@RequestMapping(path = Array("/client"))
class ClientService {
  private val logger: Logger = LoggerFactory.getLogger(classOf[ClientService])

  @Value("${message.topic.name}")
  private val topicName: String = null

  @Autowired
  private val kafkaTemplate: KafkaTemplate[String, String] = null

  /**
    * Serve static main assets to the client.
    * @return Requested static asset.
    */
  @RequestMapping(value = Array("/{name:.*\\.js}", "/{name:.*\\.css}", "/{name:.*\\.map}", "/{name:.*\\.gz}"))
  def serveMainAssets(): String = "todo"

  /**
    * Serve statis assets to the client.
    * @return Requested static asset
    */
  @RequestMapping(value = Array("/assets/*"))
  def serveAssets(): String = "todo"

  /**
    * Dummy method to test kafka comminication.
    * @deprecated
    * @return Static string.
    */
  @RequestMapping(value = Array("/**"))
  def serveMain(): String = {
    logger.warn("TopicName: " + topicName)
    kafkaTemplate.send("java", "YoHu!")
    kafkaTemplate.flush()
    "TODO"
  }

  @KafkaListener(topics = Array("java"))
  private def listener(msg: String): Unit = {
    logger.warn("Get: " + msg)
  }
}