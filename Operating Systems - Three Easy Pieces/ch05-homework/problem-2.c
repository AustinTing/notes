#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(int argc, char *argv[])
{
  FILE *fptr = fopen("./test.txt","w");
  printf("main pid(%i)\n", (int)getpid());
  int rc = fork();
  if (rc < 0)
  { 
    fprintf(stderr, "fork failed\n");
    exit(1);
  }
  else if (rc == 0)
  { 
    fprintf(fptr, "pid(%i) writes this file\n", (int)getpid());
  }
  else
  {
    wait(NULL);
    fprintf(fptr, "pid(%i) writes this file\n", (int)getpid());
  }
  return 0;
}
