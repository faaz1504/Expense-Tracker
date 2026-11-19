import {Container,Card,Table,Badge} from "react-bootstrap";

import { useSelector } from "react-redux";

function ViewUsers (){
    
    const users = useSelector(
        (state) => state.auth.users
    )

    const normalUsers = users.filter(
        (user) => user.role === "user"
    )
    
    return(
        <div>
        <Container fluid className="py-4">

      <div className="mb-4">

        <h3 className="fw-semibold mb-1">
          Users
        </h3>

        <p className="text-muted small mb-0">
          View and manage registered user accounts
        </p>

      </div>


      <Card className="border shadow-sm">

        <Card.Header className="bg-white border-bottom py-3">

          <div className="d-flex justify-content-between align-items-center">

            <h6 className="fw-semibold mb-0">
              Registered Users
            </h6>

            <Badge
              bg="secondary"
            >
              {normalUsers.length} Users
            </Badge>

          </div>

        </Card.Header>

        <Card.Body className="p-0">

          <Table
            responsive
            hover
            className="align-middle mb-0"
          >

            <thead className="table-light">

              <tr>
                <th className="py-3 ps-4">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Role</th>
              </tr>

            </thead>


            <tbody>

              {normalUsers.length > 0 ? (

                normalUsers.map((user) => (

                  <tr key={user.id}>

                    <td className="fw-semibold ps-4 py-3">

                      <div className="d-flex align-items-center gap-3">

                        <div
                          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
                          style={{
                            width:"38px",
                            height:"38px"
                          }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        {user.name}

                      </div>

                    </td>

                    <td className="text-muted">
                      {user.email}
                    </td>

                    <td>

                      <Badge
                        bg="primary"
                        className="text-capitalize px-3 py-2"
                      >
                        {user.role}
                      </Badge>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center text-muted py-5"
                  >
                    No users found
                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card.Body>

      </Card>

    </Container>
    </div>
    
    )

}
export default ViewUsers;