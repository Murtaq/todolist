package de.baumgartmichael.api;

import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.Status;

import de.baumgartmichael.entities.TodoItem;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.hibernate.reactive.rest.data.panache.PanacheEntityResource;
import io.quarkus.rest.data.panache.ResourceProperties;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.MediaType;

@ResourceProperties(path = "todos")
public interface TodoItemResource extends PanacheEntityResource<TodoItem, Long> {

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    default Uni<RestResponse<TodoItem>> addByTodoText(String todoText) {
        TodoItem newItem = new TodoItem();
        newItem.todoText = todoText;
        newItem.isChecked = false;
        return Panache.withTransaction(newItem::persist)
                .replaceWith(RestResponse.status(Status.CREATED, newItem));
    }
}
