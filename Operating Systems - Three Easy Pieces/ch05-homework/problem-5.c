#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
  printf("main pid(%i)\n", (int)getpid());
  int rc = fork();
  if (rc < 0)
  { 
    fprintf(stderr, "fork failed\n");
    exit(1);
  }
  else if (rc == 0)
  { 
    // printf("pid(%i)\n", (int)getpid());
    int waitResult = wait(NULL);
    printf("pid(%i): wait: %i\n", (int)getpid(), waitResult);
  }
  else
  {
    int waitResult = wait(NULL);
    printf("pid(%i): wait: %i\n", (int)getpid(), waitResult);
    // printf("pid(%i)\n", (int)getpid());

  }
  return 0;
}
